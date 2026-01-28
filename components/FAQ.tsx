import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Como funciona a compra?",
    answer: "É super simples! Você adiciona os produtos desejados ao carrinho aqui no site. Ao finalizar, clicando em 'Gerar Pedido no WhatsApp', nós montamos um resumo automático do seu pedido e te redirecionamos para o nosso WhatsApp oficial. Lá combinamos o pagamento e o envio."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos PIX (com aprovação imediata) e Cartão de Crédito através de link de pagamento seguro. Todas as instruções são passadas diretamente pelo WhatsApp no momento da finalização."
  },
  {
    question: "Vocês enviam para todo o Brasil?",
    answer: "Sim! Enviamos para todo o território nacional via Correios (PAC ou SEDEX) ou Transportadora, dependendo da sua região e do volume do pedido. O frete é calculado durante o atendimento."
  },
  {
    question: "Os adesivos são resistentes à água?",
    answer: "Com certeza! Nossos adesivos são produzidos em vinil de alta qualidade com proteção UV. São resistentes a sol, chuva e lavagens, perfeitos para colar em garrafas térmicas, carros, capacetes e notebooks."
  },
  {
    question: "Posso personalizar produtos para minha atlética ou empresa?",
    answer: "Sim, trabalhamos com pedidos personalizados para grandes quantidades. Entre em contato conosco pelo WhatsApp para solicitar um orçamento exclusivo para sua turma ou negócio."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-agro-gold/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-agro-soil/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-agro-bg border-2 border-agro-gold text-agro-primary rounded-full mb-6 shadow-sm">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-ranch-display text-gray-900 mb-4">
            Dúvidas Frequentes
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mb-6">
            <div className="ornament-dot"></div>
          </div>
          <p className="text-gray-500 font-medium">
            Tudo o que você precisa saber sobre nossos produtos e entregas.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-agro-bg shadow-lg border-agro-gold/40' 
                  : 'bg-white border-gray-100 hover:border-agro-gold/20 hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className={`font-ranch-display text-xl transition-colors duration-300 ${openIndex === index ? 'text-agro-primary' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-agro-primary text-white scale-110 shadow-md' 
                    : 'bg-agro-bg text-agro-primary group-hover:bg-agro-gold/20'
                }`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-agro-gold/10 mt-2 text-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
