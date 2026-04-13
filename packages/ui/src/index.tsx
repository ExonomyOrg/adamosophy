// Shared UI components for Adamosophy apps
import { JSX } from 'solid-js';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: JSX.Element;
}

export function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  
  return (
    <button 
      class={`btn btn-${variant}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export interface CardProps {
  title?: string;
  children: JSX.Element;
}

export function Card(props: CardProps) {
  return (
    <div class="card">
      {props.title && <h3 class="card-title">{props.title}</h3>}
      <div class="card-content">{props.children}</div>
    </div>
  );
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export function Drawer(props: DrawerProps) {
  return (
    <div class={`drawer ${props.open ? 'open' : ''}`}>
      <div class="drawer-overlay" onClick={props.onClose} />
      <nav class="drawer-nav">
        {props.children}
      </nav>
    </div>
  );
}

export function VoucherDisplay({ voucher }: { voucher: { id: string; amount: number; currency: string } }) {
  return (
    <div class="voucher">
      <span class="voucher-amount">{voucher.amount} {voucher.currency}</span>
      <span class="voucher-id">{voucher.id}</span>
    </div>
  );
}
