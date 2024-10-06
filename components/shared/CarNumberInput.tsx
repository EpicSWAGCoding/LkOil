'use client'

import React, { ChangeEvent, useState } from 'react';
import { Input, Label } from '@/components/ui';
import { Truck } from 'lucide-react';

interface CarNumberInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const CarNumberInput: React.FC<CarNumberInputProps> = ({ value, onChange }) => {
    const [error, setError] = useState<string | null>(null);
    
    const formatCarNumber = (input: string): string => {
        const cleaned = input.toUpperCase().replace(/[^А-Я0-9]/g, '');
        const match = cleaned.match(/^([А-Я]{0,1})(\d{0,3})([А-Я]{0,2})(\d{0,3})$/);
        
        if (!match) return cleaned;
        
        const [first, numbers1, letters, numbers2] = match;
        
        let formatted = first || '';
        if (numbers1) formatted += numbers1;
        if (letters) formatted += letters;
        if (numbers2) formatted += numbers2;
        
        return formatted;
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCarNumber(e.target.value);
        onChange(formatted);
        
        if (formatted.length === 9) {
            setError(null);
        } else if (formatted.length > 0) {
            setError('Номер должен быть в формате А000АА000');
        } else {
            setError(null);
        }
    };
    
    return (
      <div className="space-y-2">
          <Label htmlFor="carNumber" className="text-sm font-medium text-gray-700">Номер машины</Label>
          <div className="relative">
              <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="carNumber"
                value={value}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-500' : ''
                }`}
                placeholder="А000АА000"
                maxLength={9}
              />
          </div>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
};
