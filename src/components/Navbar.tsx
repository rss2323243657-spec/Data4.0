import React from 'react';
import {
  TrendingUp,
  FileText,
  PieChart,
  GitMerge,
  UploadCloud,
  Sliders,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { HealthScoreBreakdown, AnalysisResult } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  result: AnalysisResult;
  onLoadSampleData: () => void;
  onOpenConfig: () => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  result,
  onLoadSampleData,
  onOpenConfig,
  onOpenExport
}) => {
  const score = result.healthScore;

  const getScoreBadgeColor = (level: HealthScoreBreakdown['level']) => {
    switch (level) {
      case '优秀': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case '健康': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case '正常': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case '需要重点改善': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case '高风险': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const navItems = [
    { id: 'dashboard', label: '经营全景看板', icon: TrendingUp },
    { id: 'report', label: '17章月度诊断报告', icon: FileText },
    { id: 'profit', label: 'SKU/SPU 盈利与四象限', icon: PieChart },
    { id: 'linkage', label: '五大跨模块联动', icon: GitMerge },
    { id: 'import', label: '数据导入与清洗', icon: UploadCloud },
    { id: 'config', label: '成本与汇率参数', icon: Sliders }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#0071dc] text-white font-bold text-xl shadow-xs">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold leading-tight text-slate-900 tracking-tight">
                  Walmart Marketplace 经营分析与利润诊断系统
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono uppercase bg-[#0071dc]/10 text-[#0071dc] border border-[#0071dc]/20">
                  US Store
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono tracking-tight">
                SYSTEM STATUS: DATA MATCHED ({result.dataQuality.matchRate}%) | MONTH: {result.month.toUpperCase()} | ENGINE: v4.2.1
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2.5 text-xs">
            {/* ERP Sync Status Badge */}
            <div className="hidden md:flex rounded border border-slate-200 bg-slate-50 px-3 py-1.5 items-center gap-1.5">
              <span className="text-slate-400">ERP Sync:</span>
              <span className="font-semibold text-emerald-600 font-mono flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                Active
              </span>
            </div>

            {/* Exchange Rate Badge */}
            <div className="hidden lg:flex rounded border border-slate-200 bg-slate-50 px-3 py-1.5 items-center gap-1.5">
              <span className="text-slate-400">Exchange Rate:</span>
              <span className="font-semibold font-mono text-slate-700">7.20 USD/RMB</span>
            </div>

            {/* Health Score Pill */}
            <div className={`flex items-center px-2.5 py-1.5 rounded border text-xs font-mono font-medium ${getScoreBadgeColor(score.level)}`}>
              <span className="font-bold mr-1">{score.totalScore}分</span>
              <span className="opacity-80 mr-1 text-[11px]">健康度:</span>
              <span className="font-semibold">{score.level}</span>
            </div>

            {/* Load Demo Data Button */}
            <button
              onClick={onLoadSampleData}
              id="btn-load-demo"
              className="inline-flex items-center px-2.5 py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer text-xs"
              title="载入多SKU/多SPU完备实战演示数据"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
              <span className="hidden sm:inline">演示数据</span>
            </button>

            {/* Export Report Button */}
            <button
              onClick={onOpenExport}
              id="btn-export-report"
              className="inline-flex items-center px-3 py-1.5 rounded text-white bg-[#0071dc] hover:bg-[#005bb5] font-medium transition-colors shadow-xs cursor-pointer text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>导出报告</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-t border-slate-200 py-1.5 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0071dc] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
