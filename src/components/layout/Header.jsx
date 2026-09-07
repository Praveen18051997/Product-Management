import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  RefreshCw,
  Sun,
  Moon,
  Bell,
  X,
  AlertTriangle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function Header({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  refreshing,
  onRefresh,
  theme,
  onToggleTheme,
  lowStockProducts = [],
  onSelectProduct,
  onViewAllLowStock,
}) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const lowStockCount = lowStockProducts.length;

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-18 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 px-3 sm:px-6 flex items-center justify-between transition-colors gap-2">
      {/* Mobile toggle & search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl min-w-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by title, brand, category..."
            className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 bg-zinc-100/80 dark:bg-zinc-800/80 border border-transparent focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-red-500/20 text-xs sm:text-sm rounded-xl text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition duration-150 shadow-inner dark:shadow-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Header controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 ml-1 sm:ml-4 flex-shrink-0">
        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition shadow-xs cursor-pointer ${
            refreshing ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          title="Refresh products data from API"
        >
          <RefreshCw className={`w-4 h-4 text-red-600 dark:text-red-400 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">Refresh</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition shadow-xs cursor-pointer flex items-center justify-center"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 animate-fade-in" />
          )}
        </button>

        {/* Notifications popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className={`relative p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs cursor-pointer ${
              isNotificationsOpen ? 'ring-2 ring-red-500/20 bg-slate-50 dark:bg-slate-800' : ''
            }`}
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {lowStockCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {lowStockCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 py-3 z-50 overflow-hidden animate-fade-in">
              <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h4>
                  {lowStockCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                      {lowStockCount} Low Stock
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(product);
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 flex-shrink-0 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                        <img
                          src={product.thumbnail || product.images?.[0]}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            {product.stock} left in stock
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">All inventory healthy</p>
                    <p className="mt-0.5">No low stock warnings right now.</p>
                  </div>
                )}
              </div>

              {lowStockProducts.length > 0 && (
                <div className="px-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      if (onViewAllLowStock) onViewAllLowStock();
                      setIsNotificationsOpen(false);
                    }}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition cursor-pointer"
                  >
                    View All {lowStockCount} Low Stock Items →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 cursor-pointer group"
            aria-label="User profile menu"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-500 to-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:ring-2 ring-red-400/40 transition">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Admin User</p>
              <p className="text-[10px] text-slate-400">Inventory Manager</p>
            </div>
          </button>

          {/* Profile panel */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-64 max-w-xs bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-3 z-50 animate-fade-in text-xs">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-800 dark:text-slate-200">Admin User</p>
                <p className="text-slate-400 text-[11px]">admin@stockforge.io</p>
                <span className="mt-1.5 inline-block px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold text-[10px]">
                  Administrator Role
                </span>
              </div>

              <div className="py-2 space-y-1">
                <button
                  onClick={() => {
                    onToggleTheme();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                    Theme
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {theme}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onRefresh();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-red-500" />
                  <span>Sync Catalog</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 px-2 flex items-center justify-between">
                <span>Version 1.0.0</span>
                <span className="flex items-center gap-1 text-red-500 font-semibold">
                  <ShieldCheck className="w-3 h-3" /> Secure
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
