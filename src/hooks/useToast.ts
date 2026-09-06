/** * @license * SPDX-License-Identifier: Apache-2.0 */import { createContext, useContext } from 'react';/* --- Types --- */
export type ToastType = 'success' | 'error' | 'info';export interface Toast { 
 id: string;  message: string;  type: ToastType;}export interface ToastContextValue {  toasts: Toast[];  showToast: (message: string, type: ToastType) => void;  dismissToast: (id: string) => void;}/* --- Context --- */
export const ToastContext = createContext<ToastContextValue | null>(null);

// --- Hook ---
export function useToast(): ToastContextValue { 
 const ctx = useContext(ToastContext);  if (!ctx) {    throw new Error('useToast must be used within a ToastProvider');  }  return ctx;}