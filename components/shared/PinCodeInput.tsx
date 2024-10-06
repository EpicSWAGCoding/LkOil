'use client'

import React, { ChangeEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

interface PinCodeInputProps {
    value: string
    onChange: (value: string) => void
}

export const PinCodeInput: React.FC<PinCodeInputProps> = ({ value, onChange }) => {
    const [error, setError] = useState<string | null>(null)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 4)
        onChange(input)
        
        if (input.length === 4) {
            setError(null)
        } else if (input.length > 0) {
            setError('PIN-код должен состоять из 4 цифр')
        } else {
            setError(null)
        }
    }
    
    return (
      <div className="space-y-2 w-full max-w-md">
          <Label htmlFor="pinCode" className="text-sm font-medium text-gray-700">PIN-код</Label>
          <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="pinCode"
                type="password"
                value={value}
                onChange={handleChange}
                className={`pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                  error ? 'border-destructive' : ''
                }`}
                placeholder="••••"
                maxLength={4}
              />
          </div>
          {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    )
}