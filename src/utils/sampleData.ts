import { RawDataRow } from '../types/analytics';

export const INITIAL_SAMPLE_ROWS: RawDataRow[] = [
  // Jan 2025
  { Date: '2025-01-08', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 142, Units: 284, Revenue: 284000, Cost: 98000, Profit: 186000 },
  { Date: '2025-01-15', Category: 'Cloud Infrastructure', Region: 'EMEA', Orders: 98, Units: 490, Revenue: 196000, Cost: 112000, Profit: 84000 },
  { Date: '2025-01-22', Category: 'Hardware Appliances', Region: 'Americas', Orders: 64, Units: 192, Revenue: 145000, Cost: 108000, Profit: 37000 },
  { Date: '2025-01-29', Category: 'Professional Services', Region: 'APAC', Orders: 32, Units: 96, Revenue: 88000, Cost: 52000, Profit: 36000 },

  // Feb 2025
  { Date: '2025-02-05', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 156, Units: 312, Revenue: 312000, Cost: 104000, Profit: 208000 },
  { Date: '2025-02-12', Category: 'Cloud Infrastructure', Region: 'Americas', Orders: 110, Units: 550, Revenue: 220000, Cost: 121000, Profit: 99000 },
  { Date: '2025-02-19', Category: 'Hardware Appliances', Region: 'EMEA', Orders: 72, Units: 216, Revenue: 162000, Cost: 118000, Profit: 44000 },
  { Date: '2025-02-26', Category: 'Professional Services', Region: 'Americas', Orders: 38, Units: 114, Revenue: 95000, Cost: 54000, Profit: 41000 },

  // Mar 2025
  { Date: '2025-03-05', Category: 'Enterprise SaaS', Region: 'EMEA', Orders: 174, Units: 348, Revenue: 348000, Cost: 115000, Profit: 233000 },
  { Date: '2025-03-12', Category: 'Cloud Infrastructure', Region: 'APAC', Orders: 124, Units: 620, Revenue: 248000, Cost: 136000, Profit: 112000 },
  { Date: '2025-03-19', Category: 'Hardware Appliances', Region: 'APAC', Orders: 78, Units: 234, Revenue: 175000, Cost: 130000, Profit: 45000 },
  { Date: '2025-03-26', Category: 'Professional Services', Region: 'EMEA', Orders: 44, Units: 132, Revenue: 110000, Cost: 61000, Profit: 49000 },

  // Apr 2025
  { Date: '2025-04-02', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 188, Units: 376, Revenue: 376000, Cost: 122000, Profit: 254000 },
  { Date: '2025-04-09', Category: 'Cloud Infrastructure', Region: 'Americas', Orders: 135, Units: 675, Revenue: 270000, Cost: 148000, Profit: 122000 },
  { Date: '2025-04-16', Category: 'Hardware Appliances', Region: 'Americas', Orders: 82, Units: 246, Revenue: 184000, Cost: 138000, Profit: 46000 },
  { Date: '2025-04-23', Category: 'Professional Services', Region: 'APAC', Orders: 46, Units: 138, Revenue: 115000, Cost: 63000, Profit: 52000 },

  // May 2025
  { Date: '2025-05-07', Category: 'Enterprise SaaS', Region: 'EMEA', Orders: 204, Units: 408, Revenue: 408000, Cost: 130000, Profit: 278000 },
  { Date: '2025-05-14', Category: 'Cloud Infrastructure', Region: 'EMEA', Orders: 142, Units: 710, Revenue: 284000, Cost: 154000, Profit: 130000 },
  { Date: '2025-05-21', Category: 'Hardware Appliances', Region: 'EMEA', Orders: 88, Units: 264, Revenue: 198000, Cost: 149000, Profit: 49000 },
  { Date: '2025-05-28', Category: 'Professional Services', Region: 'Americas', Orders: 50, Units: 150, Revenue: 125000, Cost: 68000, Profit: 57000 },

  // Jun 2025 (Strong Quarter End)
  { Date: '2025-06-04', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 228, Units: 456, Revenue: 456000, Cost: 144000, Profit: 312000 },
  { Date: '2025-06-11', Category: 'Cloud Infrastructure', Region: 'APAC', Orders: 158, Units: 790, Revenue: 316000, Cost: 168000, Profit: 148000 },
  { Date: '2025-06-18', Category: 'Hardware Appliances', Region: 'APAC', Orders: 96, Units: 288, Revenue: 216000, Cost: 162000, Profit: 54000 },
  { Date: '2025-06-25', Category: 'Professional Services', Region: 'EMEA', Orders: 56, Units: 168, Revenue: 140000, Cost: 76000, Profit: 64000 },

  // Jul 2025
  { Date: '2025-07-02', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 218, Units: 436, Revenue: 436000, Cost: 141000, Profit: 295000 },
  { Date: '2025-07-09', Category: 'Cloud Infrastructure', Region: 'Americas', Orders: 148, Units: 740, Revenue: 296000, Cost: 161000, Profit: 135000 },
  { Date: '2025-07-16', Category: 'Hardware Appliances', Region: 'Americas', Orders: 86, Units: 258, Revenue: 193000, Cost: 147000, Profit: 46000 },
  { Date: '2025-07-23', Category: 'Professional Services', Region: 'APAC', Orders: 48, Units: 144, Revenue: 120000, Cost: 67000, Profit: 53000 },

  // Aug 2025 (Hardware supply chain spike in cost - Anomaly)
  { Date: '2025-08-06', Category: 'Enterprise SaaS', Region: 'EMEA', Orders: 232, Units: 464, Revenue: 464000, Cost: 148000, Profit: 316000 },
  { Date: '2025-08-13', Category: 'Cloud Infrastructure', Region: 'EMEA', Orders: 162, Units: 810, Revenue: 324000, Cost: 172000, Profit: 152000 },
  { Date: '2025-08-20', Category: 'Hardware Appliances', Region: 'EMEA', Orders: 92, Units: 276, Revenue: 207000, Cost: 198000, Profit: 9000 }, // Margin compressed to 4.3%
  { Date: '2025-08-27', Category: 'Professional Services', Region: 'Americas', Orders: 54, Units: 162, Revenue: 135000, Cost: 72000, Profit: 63000 },

  // Sep 2025
  { Date: '2025-09-03', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 245, Units: 490, Revenue: 490000, Cost: 153000, Profit: 337000 },
  { Date: '2025-09-10', Category: 'Cloud Infrastructure', Region: 'APAC', Orders: 170, Units: 850, Revenue: 340000, Cost: 180000, Profit: 160000 },
  { Date: '2025-09-17', Category: 'Hardware Appliances', Region: 'APAC', Orders: 102, Units: 306, Revenue: 230000, Cost: 168000, Profit: 62000 },
  { Date: '2025-09-24', Category: 'Professional Services', Region: 'EMEA', Orders: 62, Units: 186, Revenue: 155000, Cost: 81000, Profit: 74000 },

  // Oct 2025
  { Date: '2025-10-01', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 260, Units: 520, Revenue: 520000, Cost: 162000, Profit: 358000 },
  { Date: '2025-10-08', Category: 'Cloud Infrastructure', Region: 'Americas', Orders: 185, Units: 925, Revenue: 370000, Cost: 194000, Profit: 176000 },
  { Date: '2025-10-15', Category: 'Hardware Appliances', Region: 'Americas', Orders: 114, Units: 342, Revenue: 256000, Cost: 186000, Profit: 70000 },
  { Date: '2025-10-22', Category: 'Professional Services', Region: 'APAC', Orders: 68, Units: 204, Revenue: 170000, Cost: 89000, Profit: 81000 },

  // Nov 2025
  { Date: '2025-11-05', Category: 'Enterprise SaaS', Region: 'EMEA', Orders: 280, Units: 560, Revenue: 560000, Cost: 172000, Profit: 388000 },
  { Date: '2025-11-12', Category: 'Cloud Infrastructure', Region: 'EMEA', Orders: 200, Units: 1000, Revenue: 400000, Cost: 208000, Profit: 192000 },
  { Date: '2025-11-19', Category: 'Hardware Appliances', Region: 'EMEA', Orders: 125, Units: 375, Revenue: 281000, Cost: 202000, Profit: 79000 },
  { Date: '2025-11-26', Category: 'Professional Services', Region: 'Americas', Orders: 74, Units: 222, Revenue: 185000, Cost: 96000, Profit: 89000 },

  // Dec 2025 (Annual Peak)
  { Date: '2025-12-03', Category: 'Enterprise SaaS', Region: 'Americas', Orders: 320, Units: 640, Revenue: 640000, Cost: 192000, Profit: 448000 },
  { Date: '2025-12-10', Category: 'Cloud Infrastructure', Region: 'APAC', Orders: 230, Units: 1150, Revenue: 460000, Cost: 236000, Profit: 224000 },
  { Date: '2025-12-17', Category: 'Hardware Appliances', Region: 'APAC', Orders: 140, Units: 420, Revenue: 315000, Cost: 225000, Profit: 90000 },
  { Date: '2025-12-24', Category: 'Professional Services', Region: 'EMEA', Orders: 85, Units: 255, Revenue: 212000, Cost: 108000, Profit: 104000 },
];
