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
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-agro-gold/10 text-agro-primary rounded-full mb-4">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-gray-500">
            Tudo o que você precisa saber sobre nossos produtos e entregas.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-agro-bg shadow-md border-agro-gold/30' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-agro-primary' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-agro-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-200/50 mt-2">
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
