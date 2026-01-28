import React, { useMemo } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, FileText } from 'lucide-react';
import { CartItem } from '../types';
import { trackEvent } from './Analytics'; // Import Tracking

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQty 
}) => {
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Tracking Event: Begin Checkout
    trackEvent('begin_checkout', {
      currency: 'BRL',
      value: total,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

    // Simula um ID de pedido de sistema (ERP)
    const orderId = `#PED-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    const today = new Date().toLocaleDateString('pt-BR');

    // Construção da mensagem usando quebras de linha normais (\n)
    const header = `*NOVO PEDIDO - NUPEM STORE*\n--------------------------------\n*Pedido:* ${orderId}\n*Data:* ${today}\n--------------------------------\n\n`;
    
    const body = items.map(item => 
      `▪ ${item.quantity}x ${item.name}\n   _(${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)})_`
    ).join('\n\n');
    
    const footer = `\n\n--------------------------------\n*TOTAL: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}*\n--------------------------------\n\n*DADOS PARA ENTREGA:*\nNome: \nEndereço: \nCidade/UF: \nCEP: \nTelefone: \n\n_Preencha seus dados acima e aguarde as instruções de pagamento._`;
    
    const fullMessage = `${header}${body}${footer}`;
    
    // IMPORTANTE: encodeURIComponent garante que o '#' e outros caracteres especiais 
    // sejam enviados corretamente como texto, sem quebrar o link.
    const whatsappUrl = `https://wa.me/5514996377757?text=${encodeURIComponent(fullMessage)}`; 
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        title="Fechar carrinho (Esc)"
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[51] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-agro-primary text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Seu Carrinho
            <span className="text-sm font-normal bg-white/20 px-2 py-0.5 rounded-full">
              {items.length} itens
            </span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Fechar carrinho (Esc)"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBagIcon className="w-16 h-16 opacity-20" />
              <p className="text-lg">Seu carrinho está vazio.</p>
              <button 
                onClick={onClose}
                className="text-agro-primary font-semibold hover:underline"
                title="Voltar para a loja"
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="text-gray-500 hover:text-red-500 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                        title="Diminuir quantidade"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="text-gray-500 hover:text-agro-primary"
                        title="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remover item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
              </span>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-4 flex gap-3 items-start">
               <FileText className="text-blue-500 shrink-0 mt-0.5" size={16} />
               <p className="text-xs text-blue-700">
                 Ao finalizar, um <strong>protocolo de pedido</strong> será gerado automaticamente para controle interno.
               </p>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-agro-primary hover:bg-agro-secondary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-agro-primary/30 transition-all flex items-center justify-center gap-2"
              title="Gerar pedido no sistema"
            >
              <MessageCircle size={20} />
              Gerar Pedido no WhatsApp
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Ambiente seguro e otimizado para mobile.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// Simple Icon component for the empty state
const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);