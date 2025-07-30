
import { useState, useEffect } from "react";
import { Command } from "@shared/schema";

const STORAGE_KEY = "linuxhelper_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Command[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarks(parsed);
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }, [bookmarks]);

  const addBookmark = (command: Command) => {
    setBookmarks(prev => {
      // Check if already bookmarked
      if (prev.some(bookmark => bookmark.id === command.id)) {
        return prev;
      }
      return [...prev, command];
    });
  };

  const removeBookmark = (commandId: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== commandId));
  };

  const toggleBookmark = (command: Command) => {
    if (isBookmarked(command.id)) {
      removeBookmark(command.id);
    } else {
      addBookmark(command);
    }
  };

  const isBookmarked = (commandId: string) => {
    return bookmarks.some(bookmark => bookmark.id === commandId);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
  };
}
