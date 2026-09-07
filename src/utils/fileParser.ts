import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  ItemPerformanceRow,
  InventoryHealthRow,
  StorageFeeRow,
  ReturnOrderRow,
  ERPOrderRow,
  ProductCatalogRow
} from '../types';

// Helper to normalize header string for comparison
function cleanHeader(h: string): string {
  return h.toLowerCase().replace(/[\s_\-\.\(\)\[\]（）]/g, '');
}

// Helper to parse numeric values safely
function parseNum(val: any): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const str = String(val).replace(/[$,¥￥\s,%]/g, '');
  const n = parseFloat(str);
  return isNaN(n) ? 0 : n;
}

// Helper to parse boolean values safely
function parseBool(val: any): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === 'boolean') return val;
  const s = String(val).trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === 'y' || s === '1' || s === '是' || s === 'keepit';
}

// Generic file reader: parses File object into Array of JSON rows
export async function readTableFile(file: File): Promise<Record<string, any>[]> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.csv')) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as Record<string, any>[]);
        },
        error: (err) => reject(err)
      });
    });
  } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    const arrayBuffer = await file.arrayBuffer();
    const wb = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    return json as Record<string, any>[];
  } else {
    throw new Error('仅支持上传 CSV 或 Excel (.xlsx, .xls) 格式报表');
  }
}

// Semantic field extractor based on candidate aliases
function findField(row: Record<string, any>, aliases: string[]): any {
  const cleanedKeys = Object.keys(row).map(k => ({ original: k, cleaned: cleanHeader(k) }));
  for (const alias of aliases) {
    const cleanedAlias = cleanHeader(alias);
    const match = cleanedKeys.find(k => k.cleaned.includes(cleanedAlias) || cleanedAlias.includes(k.cleaned));
    if (match && row[match.original] !== undefined && row[match.original] !== '') {
      return row[match.original];
    }
  }
  return undefined;
}

export function parseItemPerformance(rows: Record<string, any>[]): ItemPerformanceRow[] {
  return rows.map(r => {
    const itemId = String(findField(r, ['item id', 'itemid', '商品id', '沃尔玛id', 'id']) || '').trim();
    const sku = String(findField(r, ['sku', 'seller sku', '商家sku', 'product sku', '子sku']) || '').trim();
    const itemName = String(findField(r, ['item name', 'product name', '商品名称', '品名', 'title']) || '').trim();
    const adSpend = parseNum(findField(r, ['ad spend', 'advertising spend', 'ad cost', '花费', '广告花费', '广告支出', 'spend', 'cost']));
    const impressions = parseNum(findField(r, ['impressions', 'impr', '曝光', '展现', '曝光量']));
    const clicks = parseNum(findField(r, ['clicks', '点击', '点击量']));
    const orders = parseNum(findField(r, ['orders', 'ad orders', '广告订单', '订单量', 'conversions']));
    const attributedSales = parseNum(findField(r, ['attributed sales', 'ad sales', '广告销售额', '广告销售', 'sales', 'sales amount']));
    const unitsSold = parseNum(findField(r, ['units sold', 'units', '销量', '广告销量']));

    return {
      itemId,
      sku,
      itemName,
      adSpend,
      impressions,
      clicks,
      orders,
      attributedSales,
      unitsSold,
      ctr: impressions > 0 ? Number(((clicks / impressions) * 100).toFixed(2)) : 0,
      cpc: clicks > 0 ? Number((adSpend / clicks).toFixed(2)) : 0,
      cvr: clicks > 0 ? Number(((orders / clicks) * 100).toFixed(2)) : 0,
      roas: adSpend > 0 ? Number((attributedSales / adSpend).toFixed(2)) : 0,
      acos: attributedSales > 0 ? Number((adSpend / attributedSales).toFixed(4)) : 0,
      rawRow: r
    };
  }).filter(row => row.sku || row.itemId);
}

export function parseInventoryHealth(rows: Record<string, any>[]): InventoryHealthRow[] {
  return rows.map(r => {
    const sku = String(findField(r, ['sku', 'seller sku', '商家sku', 'product sku']) || '').trim();
    const itemId = String(findField(r, ['item id', 'itemid', '商品id']) || '').trim();
    const totalInventory = parseNum(findField(r, ['total inventory', 'total on hand', '总库存', '在库库存', 'on hand']));
    const availableInventory = parseNum(findField(r, ['available', 'available inventory', '可售库存', '可售数量', 'fulfillable']));
    const reservedInventory = parseNum(findField(r, ['reserved', '预留库存', '锁定库存']));
    const inboundInventory = parseNum(findField(r, ['inbound', '在途', '在途库存', '在途数量']));

    const age0_30 = parseNum(findField(r, ['0-30', '0 to 30', '0-30天', 'age 0-30']));
    const age31_90 = parseNum(findField(r, ['31-90', '31 to 90', '31-90天', 'age 31-90']));
    const age91_180 = parseNum(findField(r, ['91-180', '91 to 180', '91-180天', 'age 91-180']));
    const age181_270 = parseNum(findField(r, ['181-270', '181 to 270', '181-270天', 'age 181-270']));
    const age271_365 = parseNum(findField(r, ['271-365', '271 to 365', '271-365天', 'age 271-365']));
    const age365_450 = parseNum(findField(r, ['365-450', '365 to 450', '365-450天', 'age 365-450']));
    const age450Plus = parseNum(findField(r, ['450+', '450 +', '450天以上', 'age 450+']));

    return {
      sku,
      itemId,
      totalInventory: totalInventory || (availableInventory + reservedInventory),
      availableInventory,
      reservedInventory,
      inboundInventory,
      age0_30,
      age31_90,
      age91_180,
      age181_270,
      age271_365,
      age365_450,
      age450Plus,
      rawRow: r
    };
  }).filter(row => row.sku || row.itemId);
}

export function parseStorageFees(rows: Record<string, any>[]): StorageFeeRow[] {
  return rows.map(r => {
    const sku = String(findField(r, ['sku', 'seller sku', '商家sku', 'product sku']) || '').trim();
    const itemId = String(findField(r, ['item id', 'itemid', '商品id']) || '').trim();
    const normalStorageFee = parseNum(findField(r, ['normal storage fee', 'base storage', '常规仓储费', '正常仓储费', '月度仓储费', 'storage fee']));
    const storageFee365_450 = parseNum(findField(r, ['365-450 days storage fee', '365-450 fee', '365-450天仓储费', '365-450仓储费']));
    const storageFee450Plus = parseNum(findField(r, ['450+ days storage fee', '450+ fee', '450天以上仓储费', '450+仓储费', '超期仓储费']));
    let totalStorageFee = parseNum(findField(r, ['total storage fee', 'total fee', '总仓储费', '仓储费合计', 'total']));

    if (!totalStorageFee) {
      totalStorageFee = normalStorageFee + storageFee365_450 + storageFee450Plus;
    }

    return {
      sku,
      itemId,
      normalStorageFee,
      storageFee365_450,
      storageFee450Plus,
      totalStorageFee,
      rawRow: r
    };
  }).filter(row => row.sku || row.itemId || row.totalStorageFee > 0);
}

export function parseReturnOrders(rows: Record<string, any>[]): ReturnOrderRow[] {
  return rows.map((r, idx) => {
    const returnOrderId = String(findField(r, ['return order id', 'return id', 'rma', '退货单号', '退货id']) || `RET-${idx}`).trim();
    const orderId = String(findField(r, ['order id', 'order number', '原订单号', '订单号']) || '').trim();
    const returnDate = String(findField(r, ['return date', 'date', '退货时间', '退货日期', '申请时间']) || '').trim();
    const sku = String(findField(r, ['sku', 'seller sku', '商家sku', 'product sku']) || '').trim();
    const itemId = String(findField(r, ['item id', 'itemid', '商品id']) || '').trim();
    const returnQty = parseNum(findField(r, ['return qty', 'qty', 'quantity', '退货数量', '数量'])) || 1;
    const returnAmount = parseNum(findField(r, ['return amount', 'refund amount', '退款金额', '退货金额', 'amount']));
    const returnReason = String(findField(r, ['return reason', 'reason', '退货原因', '原因', 'customer comment']) || '客户不需要/其他').trim();
    const keepIt = parseBool(findField(r, ['keep it', 'keepit', '免退货', '仅退款', '客户保留']));
    const returnStatus = String(findField(r, ['return status', 'status', '退货状态', '状态']) || 'Completed').trim();
    const sellerResponsible = parseBool(findField(r, ['seller responsible', 'seller responsibility', '卖家责任', '品质问题', '责任方']));

    return {
      returnOrderId,
      orderId,
      returnDate,
      sku,
      itemId,
      returnQty,
      returnAmount,
      returnReason,
      keepIt,
      returnStatus,
      sellerResponsible,
      rawRow: r
    };
  }).filter(row => row.sku || row.itemId || row.returnOrderId);
}

export function parseErpOrders(rows: Record<string, any>[]): ERPOrderRow[] {
  return rows.map((r, idx) => {
    const orderId = String(findField(r, ['order id', 'order number', '订单编号', '订单号', 'erp order id']) || `ORD-${idx}`).trim();
    const orderDate = String(findField(r, ['order date', 'order time', '下单时间', '订单时间', '支付时间', 'date']) || '').trim();
    const sku = String(findField(r, ['sku', 'seller sku', '产品sku', '商家sku', 'item sku']) || '').trim();
    const shippedQty = parseNum(findField(r, ['shipped qty', 'qty', 'quantity', '发货数量', '订单发货数量', '购买数量'])) || 1;
    const unitPrice = parseNum(findField(r, ['unit price', 'price', '单价', '产品单价', '售价']));
    let orderAmount = parseNum(findField(r, ['order amount', 'total amount', '订单金额', '金额', '销售额']));

    // Check if orderAmount is empty or equivalent to unitPrice
    if (!orderAmount && unitPrice > 0) {
      orderAmount = Number((unitPrice * shippedQty).toFixed(2));
    }

    const unitCostRmb = parseNum(findField(r, ['unit cost', 'product cost', '采购单价', '产品成本', '成本(rmb)', 'cost']));
    const orderStatus = String(findField(r, ['order status', 'status', '订单状态', '状态']) || 'Shipped').trim();

    return {
      orderId,
      orderDate,
      sku,
      unitPrice,
      shippedQty,
      orderAmount,
      unitCostRmb: unitCostRmb > 0 ? unitCostRmb : undefined,
      orderStatus,
      rawRow: r
    };
  }).filter(row => row.sku);
}

export function parseProductCatalog(rows: Record<string, any>[]): ProductCatalogRow[] {
  return rows.map(r => {
    const itemId = String(findField(r, ['item id', 'itemid', '商品id', 'walmart item id']) || '').trim();
    const sku = String(findField(r, ['sku', 'seller sku', '商家sku', 'product sku']) || '').trim();
    const spu = String(findField(r, ['spu', 'parent sku', '父sku', '款号', '系列']) || 'SPU-DEFAULT').trim();
    const productType = String(findField(r, ['product type', 'category', '产品类型', '品类', '类目']) || '未分类').trim();
    const productName = String(findField(r, ['product name', 'item name', '商品名称', '品名']) || '').trim();

    return {
      itemId,
      sku,
      spu,
      productType,
      productName
    };
  }).filter(row => row.sku || row.itemId);
}
