'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BadgeDollarSign, 
  Boxes, 
  Bell, 
  UserCircle, 
  ChevronRight, 
  Info, 
  CreditCard, 
  Image as ImageIcon, 
  CloudUpload,
  Save,
  Trash2,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function ProductRegistration() {
  const [activeTab, setActiveTab] = useState('Products');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: Package },
    { name: 'Sales', icon: BadgeDollarSign },
    { name: 'Inventory', icon: Boxes },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setToast({ message: 'Produto salvo com sucesso!', type: 'success' });
  };

  const handleNavClick = (name: string) => {
    setActiveTab(name);
    setToast({ message: `Navegando para: ${name}`, type: 'info' });
  };

  const toggleFeatured = () => {
    const newState = !isFeatured;
    setIsFeatured(newState);
    setToast({ 
      message: newState ? 'Produto marcado como destaque!' : 'Destaque removido.', 
      type: 'info' 
    });
  };

  const handleDiscard = () => {
    setToast({ message: 'Alterações descartadas.', type: 'info' });
    // In a real app, this might reset the form or navigate away
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={cn(
              "fixed top-4 left-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]",
              toast.type === 'success' ? "bg-emerald-500 text-white" : "bg-slate-800 text-white"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <Info size={20} />}
            <span className="text-sm font-bold flex-1">{toast.message}</span>
            <button onClick={() => setToast(null)} className="hover:opacity-70 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 px-6 lg:px-40 py-3 flex items-center justify-between">
        <button 
          onClick={() => handleNavClick('Dashboard')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Boxes size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">ERP Pink</h2>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name)}
              className={cn(
                "text-sm font-medium transition-all relative py-1",
                activeTab === item.name 
                  ? "text-primary font-bold" 
                  : "text-slate-500 hover:text-primary"
              )}
            >
              {item.name}
              {activeTab === item.name && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setToast({ message: 'Sem novas notificações', type: 'info' })}
            className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setToast({ message: 'Perfil do usuário', type: 'info' })}
            className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <UserCircle size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'Products' ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Breadcrumbs & Title */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="space-y-1">
                  <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
                    <button 
                      onClick={() => handleNavClick('Inventory')}
                      className="hover:text-primary cursor-pointer transition-colors"
                    >
                      Inventory
                    </button>
                    <ChevronRight size={14} />
                    <span className="text-primary">Add Product</span>
                  </nav>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Cadastro de Produtos</h1>
                  <p className="text-slate-500 text-sm">Preencha as informações para adicionar um novo item ao catálogo.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleDiscard}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all"
                  >
                    Descartar
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                      "px-8 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100",
                      isSaving && "bg-primary-hover"
                    )}
                  >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSaving ? 'Salvando...' : 'Salvar Produto'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* General Info */}
                  <section className="glass-card p-8">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Info size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Informações Gerais</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="label-text">Nome do Produto</label>
                        <input 
                          type="text" 
                          className="input-field" 
                          placeholder="Ex: Camiseta Algodão Premium"
                        />
                      </div>
                      
                      <div>
                        <label className="label-text">SKU</label>
                        <input 
                          type="text" 
                          className="input-field" 
                          placeholder="PROD-12345"
                        />
                      </div>

                      <div>
                        <label className="label-text">Categoria</label>
                        <select className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat">
                          <option>Selecione uma categoria</option>
                          <option>Vestuário</option>
                          <option>Eletrônicos</option>
                          <option>Acessórios</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="label-text">Descrição</label>
                        <textarea 
                          className="input-field min-h-[120px] resize-none" 
                          placeholder="Descreva os detalhes do produto..."
                        />
                      </div>
                    </div>
                  </section>

                  {/* Price & Stock */}
                  <section className="glass-card p-8">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <CreditCard size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Preço e Estoque</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label-text">Preço de Venda (R$)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">R$</span>
                          <input 
                            type="text" 
                            className="input-field pl-12" 
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="label-text">Quantidade em Estoque</label>
                        <input 
                          type="number" 
                          className="input-field" 
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Media */}
                  <section className="glass-card p-8">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <ImageIcon size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Mídia do Produto</h3>
                    </div>

                    <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-2xl p-8 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer">
                      <div className="size-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <CloudUpload size={32} />
                      </div>
                      <p className="text-slate-900 text-sm font-bold">Upload de Imagem</p>
                      <p className="text-slate-400 text-xs text-center mt-2">
                        Arraste ou clique para selecionar<br/>(PNG, JPG ou WEBP)
                      </p>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        'https://picsum.photos/seed/pink-shirt/400/400',
                        'https://picsum.photos/seed/pink-bag/400/400',
                        'https://picsum.photos/seed/pink-watch/400/400'
                      ].map((src, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-slate-50 border border-slate-100 overflow-hidden group/item relative">
                          <img 
                            src={src} 
                            alt={`Preview ${i + 1}`} 
                            className="w-full h-full object-cover transition-transform group-hover/item:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                            <Trash2 size={16} className="text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Visibility Status */}
                  <section className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Status de Visibilidade</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Ativo na Loja</span>
                        <button 
                          onClick={() => setIsActive(!isActive)}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                            isActive ? "bg-primary" : "bg-slate-200"
                          )}
                        >
                          <span 
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              isActive ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Destaque</span>
                        <button 
                          onClick={toggleFeatured}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                            isFeatured ? "bg-primary" : "bg-slate-200"
                          )}
                        >
                          <span 
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              isFeatured ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="mt-10 flex md:hidden items-center gap-3">
                <button className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm">
                  Descartar
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : 'Salvar'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="size-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                {activeTab === 'Dashboard' && <LayoutDashboard size={48} />}
                {activeTab === 'Sales' && <BadgeDollarSign size={48} />}
                {activeTab === 'Inventory' && <Boxes size={48} />}
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{activeTab}</h1>
              <p className="text-slate-500 max-w-md">
                Esta é a visualização de <strong>{activeTab}</strong>. 
                Em breve, você poderá visualizar métricas, relatórios e gerenciar dados específicos desta seção.
              </p>
              <button 
                onClick={() => handleNavClick('Products')}
                className="mt-8 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
              >
                Voltar para Cadastro de Produtos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-40 py-8 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-medium">
            © 2024 ERP Pink Management System. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors font-medium">Suporte</a>
            <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors font-medium">Privacidade</a>
            <a href="#" className="text-xs text-slate-400 hover:text-primary transition-colors font-medium">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
