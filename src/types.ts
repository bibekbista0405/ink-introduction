import * as React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}
