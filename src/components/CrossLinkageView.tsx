import React from 'react';
import {
  TrendingUp,
  RotateCcw,
  Warehouse,
  Flame,
  AlertOctagon,
  Clock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface CrossLinkageViewProps {
  result: AnalysisResult;
}

export const CrossLinkageView: React.FC<CrossLinkageViewProps> = ({ result }) => {
  const formatUsd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const {
    salesAdProfitLinkage,
    salesReturnLinkage,
    inventorySalesLinkage,
    inventoryAdLinkage,
    agingStorageLinkage
  } = result;

  return (
    <div className="space-y-5 pb-12">
      {/* Technical Header Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#0071dc] text-[10px] font-bold uppercase tracking-wider font-mono">
            <Info className="w-3.5 h-3.5" />
            <span>Walmart Marketplace · 5-Dimensional Diagnostic Engine</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold mt-1 text-slate-900 tracking-tight">
            跨模块联动诊断：透视单品隐匿冲突与资金损耗
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            打通广告、库存库龄、WFS仓储费与退货订单联动，精准检测广告侵蚀毛利、断货高投错配、滞销惩罚罚金。
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <div className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-right">
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Linkage State</span>
            <span className="text-xs font-bold font-mono text-emerald-600">5/5 SYNCED</span>
          </div>
        </div>
      </div>

      {/* 5 Linkage Cards */}
      <div className="space-y-4">
        {/* Linkage 1: 销售 × 广告 × 利润 */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-blue-50 text-[#0071dc] rounded border border-blue-200">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  联动一：销售 × 广告 × 利润联动分析
                </h3>
                <p className="text-[11px] text-slate-500">
                  判断广告预算是真正驱动经营利润增长，还是造成“虚假繁荣侵蚀毛利”
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
              CASE: {salesAdProfitLinkage.caseType}
            </span>
          </div>

          <div className="mt-3.5 p-3 rounded border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-700 font-mono">
            <strong className="text-slate-900">【核心诊断结论】:</strong> {salesAdProfitLinkage.description}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-3.5 rounded-lg bg-rose-50/70 border border-rose-200">
              <span className="font-bold font-mono text-rose-900 flex items-center mb-1 text-xs">
                <Flame className="w-3.5 h-3.5 mr-1 text-rose-600" />
                虚假繁荣典型：SKU-CHAIR-GRY (浅灰电脑椅)
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed font-mono">
                本月广告花费飙升至 <strong className="text-rose-700">$6,850</strong>，归因销售达 $17,611，ROAS 仅 <strong className="text-rose-700">2.57</strong>。
                全店销售占比虽高，但扣除采购、头程、仓储与高额广告后，单品贡献利润率大幅滑落至 <strong className="text-rose-700">18.2%</strong>！
                典型【靠高预算硬砸销售额，严重蚕食店铺真金白银利润】。
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
              <span className="font-bold font-mono text-emerald-900 flex items-center mb-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                健康飞轮典型：SKU-DESK-MOTO (双电机升降桌)
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed font-mono">
                广告花费仅投入 <strong className="text-emerald-700">$2,800</strong>，撬动广告销售 <strong className="text-emerald-700">$23,039</strong>，ROAS 高达 <strong className="text-emerald-700">8.23</strong>！
                广告销售比仅 9.1%，自然流量与广告权重良性互哺，贡献经营利润 <strong className="text-emerald-700">$11,940.67</strong> (净利润率 38.9%)。
              </p>
            </div>
          </div>
        </div>

        {/* Linkage 2: 销售 × 退货 */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  联动二：销售 × 退货联动分析
                </h3>
                <p className="text-[11px] text-slate-500">
                  排查高销背后的隐蔽退款黑洞、Keep-It免退货货值净损失及卖家责任事故
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              全店退货率: <strong className="text-slate-900">{result.coreFinancials.returnRatePct}%</strong> | 卖家责任: <strong className="text-rose-600">{result.coreFinancials.sellerResponsibleRatePct}%</strong>
            </span>
          </div>

          <div className="mt-3.5 p-3 rounded border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-700 font-mono">
            <strong className="text-slate-900">【核心诊断结论】:</strong> {salesReturnLinkage.description}
          </div>

          <div className="mt-3 overflow-x-auto text-xs">
            <table className="w-full text-left border border-slate-200 rounded overflow-hidden">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-200 font-mono">
                <tr>
                  <th className="py-2 px-3">异常 SKU</th>
                  <th className="py-2 px-3 text-right">出货量</th>
                  <th className="py-2 px-3 text-right">退货量</th>
                  <th className="py-2 px-3 text-right">退货率</th>
                  <th className="py-2 px-3 text-right">退款金额</th>
                  <th className="py-2 px-3">主要原因与责任</th>
                  <th className="py-2 px-3">紧急运营对策</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {salesReturnLinkage.highReturnSkus.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-bold text-slate-900">{r.sku}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{r.salesQty}</td>
                    <td className="py-2 px-3 text-right font-bold text-rose-600">{r.returnUnits}</td>
                    <td className="py-2 px-3 text-right font-bold text-rose-600">{r.returnRatePct}%</td>
                    <td className="py-2 px-3 text-right text-slate-900">{formatUsd(r.returnAmount)}</td>
                    <td className="py-2 px-3 text-slate-700 font-sans text-xs">{r.reason}</td>
                    <td className="py-2 px-3 text-[#0071dc] font-sans text-xs font-medium">严查防呆包装，补齐螺丝配件</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Linkage 3: 库存 × 销售 */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-amber-50 text-amber-700 rounded border border-amber-200">
                <Warehouse className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  联动三：库存 × 销售动销联动分析
                </h3>
                <p className="text-[11px] text-slate-500">
                  预警断货风险（DOS &lt; 20天）与滞销积压风险（DOS &gt; 180天），优化周转
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 p-3 rounded border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-700 font-mono">
            <strong className="text-slate-900">【核心诊断结论】:</strong> {inventorySalesLinkage.description}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-3.5 rounded-lg bg-rose-50/70 border border-rose-200">
              <span className="font-bold font-mono text-rose-900 block mb-2 text-xs">
                🚨 断货风险清单 (DOS &lt; 20天)
              </span>
              {inventorySalesLinkage.stockoutRisks.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded border border-rose-200 mb-2 font-mono text-[11px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{item.sku}</span>
                    <span className="text-rose-600">DOS: {item.daysOfSupply} 天</span>
                  </div>
                  <div className="flex justify-between text-slate-500 mt-1">
                    <span>在库: {item.currentStock} 件</span>
                    <span>日均出货: {item.dailySales} 件</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200">
              <span className="font-bold font-mono text-amber-900 block mb-2 text-xs">
                🐢 严重滞销积压清单 (DOS &gt; 180天)
              </span>
              {inventorySalesLinkage.overstockRisks.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded border border-amber-200 mb-2 font-mono text-[11px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{item.sku}</span>
                    <span className="text-amber-800">DOS: {item.daysOfSupply} 天</span>
                  </div>
                  <div className="flex justify-between text-slate-500 mt-1">
                    <span>积压在库: {item.currentStock} 件</span>
                    <span>日均出货: {item.dailySales} 件</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linkage 4: 库存 × 广告 */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-rose-50 text-rose-700 rounded border border-rose-200">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  联动四：库存 × 广告错配冲突分析
                </h3>
                <p className="text-[11px] text-slate-500">
                  排查“即将断货却高投广告”与“大量积压却零广告支持”的运营脱节
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 p-3 rounded border border-rose-200 bg-rose-50/60 text-xs leading-relaxed text-rose-950 font-mono">
            <strong>【严重运营失误警报】:</strong> {inventoryAdLinkage.description}
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {inventoryAdLinkage.mismatchCases.map((m, idx) => (
              <div key={idx} className="p-3 rounded border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      {m.mismatchType}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{m.sku}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] mt-1">
                    在库库存: <strong>{m.stock}件</strong> | 当月广告花费: <strong>{formatUsd(m.adSpend)}</strong>
                  </div>
                </div>
                <div className="text-xs font-bold text-[#0071dc] shrink-0 font-sans">
                  处置: {m.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Linkage 5: 库龄 × 仓储 */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-purple-50 text-purple-700 rounded border border-purple-200">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  联动五：库龄 × 仓储费用透视
                </h3>
                <p className="text-[11px] text-slate-500">
                  锁定 365-450天 与 450天+ 惩罚性附加费的元凶单品，防止利润失血
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200 font-bold">
              高库龄附加费占比: {agingStorageLinkage.highAgingStoragePct}%
            </span>
          </div>

          <div className="mt-3.5 p-3 rounded border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-700 font-mono">
            <strong className="text-slate-900">【核心诊断结论】:</strong> {agingStorageLinkage.description}
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {agingStorageLinkage.riskSkus.map((r, idx) => (
              <div key={idx} className="p-3 rounded border border-rose-200 bg-rose-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-xs">{r.sku}</span>
                    <span className="text-[10px] text-slate-500">超365天滞销件数: {r.aging365PlusQty} 件</span>
                  </div>
                  <div className="text-slate-600 text-[11px] mt-1">
                    产生惩罚性仓储费: <strong className="text-rose-700">{formatUsd(r.highAgingStorageFee)}</strong>
                  </div>
                </div>
                <div className="text-xs font-bold text-rose-800 shrink-0 font-sans">
                  建议执行: {r.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
