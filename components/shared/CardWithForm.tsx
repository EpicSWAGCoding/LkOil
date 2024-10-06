'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { FC } from 'react';
import { CardLoginForm, PhoneLoginForm } from '@/components/shared';

interface Props {
    className?: string;
}

export const CardWithForm: FC<Props> = () => {
    return (
      <Tabs defaultValue="card" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card">Топливная карта</TabsTrigger>
              <TabsTrigger value="phone">Телефон</TabsTrigger>
          </TabsList>
          
          <TabsContent value="card">
              <CardLoginForm />
          </TabsContent>
          
          <TabsContent value="phone">
              <PhoneLoginForm />
          </TabsContent>
      </Tabs>
    );
};
