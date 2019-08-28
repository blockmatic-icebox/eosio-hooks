import React from 'react';
import { DfuseConfig } from './types';
export default function DfuseProvider({ apiKey, network, children }: DfuseConfig & {
    children: React.ReactNode;
}): any;
