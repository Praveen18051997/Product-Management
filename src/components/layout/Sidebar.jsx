import React from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  X,
  Wifi,
  WifiOff
} from 'lucide-react';

export function Sidebar({
  isOpen,
  onClose,
  activeTab = 'overview',
  setActiveTab,
  stats,
  selectedCategory,
  onSelectCategory,
  categories = [],
  isApiConnected = true,
  onToggleApiConnection,
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'All Products', icon: Package, badge: stats?.totalProducts },
    { id: 'categories', label: 'Categories', icon: Boxes, badge: categories?.length || 24 },
  ];

  const popularCategories = categories.slice(0, 8);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200/80 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/25">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white flex items-center gap-1">
                Stock<span className="text-red-500 font-black">Forge</span>
              </span>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Product Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Main menu */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Main Menu
            </div>
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (setActiveTab) setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/20 shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-zinc-400 dark:text-zinc-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick department shortcuts */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Browse Departments
              </span>
              <span className="text-[11px] font-medium text-zinc-400">{categories.length}</span>
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('all');
                  if (onClose) onClose();
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  selectedCategory === 'all' && activeTab === 'products'
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <span>All Departments</span>
                <span className="text-[10px] text-zinc-400">{stats?.totalProducts || 0}</span>
              </button>
              {popularCategories.map(cat => {
                const isSelected = selectedCategory === cat.slug && activeTab === 'products';
                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.slug);
                      if (onClose) onClose();
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between capitalize ${
                      isSelected
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/20'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-zinc-300 dark:text-zinc-600">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* API connection status & toggle */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex-shrink-0">
          <div
            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
              isApiConnected
                ? 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-800'
                : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isApiConnected ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isApiConnected ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                ></span>
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">DummyJSON API</p>
                <p
                  className={`text-[10px] font-medium truncate ${
                    isApiConnected ? 'text-zinc-400' : 'text-rose-500 dark:text-rose-400 font-semibold'
                  }`}
                >
                  {isApiConnected ? 'Live Sync Connected' : 'Disconnected (Error)'}
                </p>
              </div>
            </div>

            <button
              onClick={onToggleApiConnection}
              className={`w-8 h-8 rounded-xl transition-all flex items-center justify-center flex-shrink-0 cursor-pointer ${
                isApiConnected
                  ? 'bg-zinc-100 hover:bg-rose-50 dark:bg-zinc-800/80 dark:hover:bg-rose-950/60 text-zinc-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-rose-200 dark:hover:border-rose-800/60'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-xs shadow-red-600/30 ring-2 ring-red-500/20'
              }`}
              title={isApiConnected ? 'Disconnect API (Simulate Error State)' : 'Connect API'}
              aria-label={isApiConnected ? 'Disconnect API' : 'Connect API'}
            >
              {isApiConnected ? (
                <WifiOff className="w-4 h-4" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
