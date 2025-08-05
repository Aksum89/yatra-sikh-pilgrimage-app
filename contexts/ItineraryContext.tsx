
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ItineraryItem {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  image: string;
  completed: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ItineraryContextType {
  itinerary: ItineraryItem[];
  addToItinerary: (item: Omit<ItineraryItem, 'id' | 'date' | 'time' | 'duration' | 'completed'>) => void;
  removeFromItinerary: (id: number) => void;
  toggleCompletion: (id: number) => void;
  isInItinerary: (name: string) => boolean;
  getProgress: () => { completed: number; total: number; percentage: number };
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

const STORAGE_KEY = '@pilgrimage_itinerary';

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  // Load itinerary from storage on app start
  useEffect(() => {
    loadItinerary();
  }, []);

  // Save itinerary to storage whenever it changes
  useEffect(() => {
    saveItinerary();
  }, [itinerary]);

  const loadItinerary = async () => {
    try {
      const storedItinerary = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedItinerary) {
        const parsedItinerary = JSON.parse(storedItinerary);
        setItinerary(parsedItinerary);
      }
    } catch (error) {
      console.error('Error loading itinerary:', error);
    }
  };

  const saveItinerary = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  const addToItinerary = (item: Omit<ItineraryItem, 'id' | 'date' | 'time' | 'duration' | 'completed'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: Date.now(), // Simple ID generation
      date: new Date(Date.now() + itinerary.length * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next available day
      time: '7:00 AM',
      duration: '3 hours',
      completed: false,
    };
    
    setItinerary(prev => [...prev, newItem]);
  };

  const removeFromItinerary = (id: number) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  };

  const toggleCompletion = (id: number) => {
    setItinerary(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const isInItinerary = (name: string) => {
    return itinerary.some(item => item.name === name);
  };

  const getProgress = () => {
    const total = itinerary.length;
    const completed = itinerary.filter(item => item.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  return (
    <ItineraryContext.Provider value={{ itinerary, addToItinerary, removeFromItinerary, toggleCompletion, isInItinerary, getProgress }}>
      {children}
    </ItineraryContext.Provider>
  );
};
