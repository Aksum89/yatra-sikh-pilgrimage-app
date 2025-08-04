
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ItineraryItem {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  image: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ItineraryContextType {
  itinerary: ItineraryItem[];
  addToItinerary: (item: Omit<ItineraryItem, 'id' | 'date' | 'time' | 'duration'>) => void;
  removeFromItinerary: (id: number) => void;
  isInItinerary: (name: string) => boolean;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const addToItinerary = (item: Omit<ItineraryItem, 'id' | 'date' | 'time' | 'duration'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: Date.now(), // Simple ID generation
      date: new Date(Date.now() + itinerary.length * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next available day
      time: '7:00 AM',
      duration: '3 hours',
    };
    
    setItinerary(prev => [...prev, newItem]);
  };

  const removeFromItinerary = (id: number) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  };

  const isInItinerary = (name: string) => {
    return itinerary.some(item => item.name === name);
  };

  return (
    <ItineraryContext.Provider value={{ itinerary, addToItinerary, removeFromItinerary, isInItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};
