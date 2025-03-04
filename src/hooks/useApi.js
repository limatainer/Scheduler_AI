import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { handleApiError, retry, logError } from '../utils/errorUtils';
import { useLocalStorage } from './useStorage';

// Configuration
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
const DEFAULT_TIMEOUT = 30000; // 30 seconds in milliseconds

// Create axios instance with defaults
const api = axios.create({
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// useApi hook for making API requests with caching and error handling
const useApi = (initialUrl = null, initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cacheKey, setCacheKey] = useState(null);

  // Use localStorage for caching
  const [cache, setCache] = useLocalStorage('api-cache', {});

  // Keep track of active requests for cleanup
  const abortControllerRef = useRef(null);

  // Generate cache key based on URL and options
  const generateCacheKey = useCallback((url, options) => {
    const { method = 'GET', params, data } = options;
    return `${method}:${url}:${JSON.stringify(params || {})}:${JSON.stringify(
      data || {}
    )}`;
  }, []);

  // Get data from cache if available and not expired
  const getFromCache = useCallback(
    (key) => {
      if (!cache[key]) return null;

      const { timestamp, data, expiresAt } = cache[key];
      const now = Date.now();

      // Check if cache has expired
      if (expiresAt && now > expiresAt) {
        // Clean up expired cache
        const newCache = { ...cache };
        delete newCache[key];
        setCache(newCache);
        return null;
      }

      return data;
    },
    [cache, setCache]
  );

  // Save data to cache with expiration
  const saveToCache = useCallback(
    (key, data, cacheTime = DEFAULT_CACHE_TIME) => {
      const timestamp = Date.now();
      const expiresAt = timestamp + cacheTime;

      setCache({
        ...cache,
        [key]: {
          timestamp,
          expiresAt,
          data,
        },
      });
    },
    [cache, setCache]
  );

  // Clear entire cache or specific key
  const clearCache = useCallback(
    (specificKey = null) => {
      if (specificKey) {
        const newCache = { ...cache };
        delete newCache[specificKey];
        setCache(newCache);
      } else {
        setCache({});
      }
    },
    [cache, setCache]
  );

  // Execute the API request
  const executeRequest = useCallback(async () => {
    if (!url) return;

    const {
      method = 'GET',
      params,
      data: requestData,
      headers,
      useCache = true,
      cacheTime = DEFAULT_CACHE_TIME,
      retry: shouldRetry = false,
      maxRetries = 3,
      onUploadProgress,
      onDownloadProgress,
      ...restOptions
    } = options;

    // Generate cache key
    const key = generateCacheKey(url, { method, params, data: requestData });
    setCacheKey(key);

    // Check cache for GET requests if useCache is true
    if (method === 'GET' && useCache) {
      const cachedData = getFromCache(key);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        setError(null);
        return;
      }
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const requestFn = async () => {
        return await api({
          url,
          method,
          params,
          data: requestData,
          headers,
          signal: abortController.signal,
          onUploadProgress,
          onDownloadProgress,
          ...restOptions,
        });
      };

      // Use retry logic if configured
      const response = shouldRetry
        ? await retry(requestFn, maxRetries)
        : await requestFn();

      // Process successful response
      const responseData = response.data;
      setData(responseData);

      // Cache the response for GET requests if useCache is true
      if (method === 'GET' && useCache) {
        saveToCache(key, responseData, cacheTime);
      }

      setLoading(false);
      return responseData;
    } catch (err) {
      // Don't set error state if request was intentionally aborted
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
        return;
      }

      // Handle and format the error
      const formattedError = handleApiError(err);
      setError(formattedError);

      // Log the error (for monitoring)
      logError(err, { url, method, params });

      setLoading(false);
      throw formattedError;
    }
  }, [url, options, generateCacheKey, getFromCache, saveToCache]);

  // Execute request when URL or options change
  useEffect(() => {
    if (url) {
      executeRequest();
    }

    // Cleanup function to abort any pending request
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, JSON.stringify(options), executeRequest]);

  // Function to manually trigger a request with new URL and options
  const request = useCallback(
    (newUrl = url, newOptions = {}) => {
      setUrl(newUrl);
      setOptions({ ...options, ...newOptions });
      return executeRequest();
    },
    [url, options, executeRequest]
  );

  // Function to manually invalidate and refresh the cache
  const refresh = useCallback(() => {
    if (cacheKey) {
      clearCache(cacheKey);
    }
    return executeRequest();
  }, [cacheKey, clearCache, executeRequest]);

  return {
    data,
    error,
    loading,
    request,
    refresh,
    clearCache,
  };
};

export default useApi;
