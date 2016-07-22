
'use strict';
describe('pos ', () => {
  it('should print formattedItems', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    let formattedItems = getFormattedItems(tags);

    const expectText = [{barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000003',count:2},
      {barcode:'ITEM000005',count:1},
      {barcode:'ITEM000005',count:1},
      {barcode:'ITEM000005',count:1}
    ];
    expect(formattedItems).toEqual(expectText);
  });
});
//#2
'use strict';
describe('pos', () => {
  it('should print  countBarcodes', () => {
    const formattedTags = [{barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},
      {barcode:'ITEM000003',count:2},
      {barcode:'ITEM000005',count:1},
      {barcode:'ITEM000005',count:1},
      {barcode:'ITEM000005',count:1}
    ];

    let countBarcodes = getCountItems(formattedTags);

    const expectText = [{count:5,barcode:'ITEM000001'},
      {count:2,barcode:'ITEM000003'},
      {count:3,barcode:'ITEM000005'}
    ];
    expect(countBarcodes).toEqual(expectText);
  });
});

// No #3
'use strict';
describe('pos', () => {
  it('should print allCartItems', () => {
    const countedBarcodes = [{count:5,barcode:'ITEM000001'},
      {count:2,barcode:'ITEM000003'},
      {count:3,barcode:'ITEM000005'}];

    const allItems = loadAllItems();
    let cartItems= buildCartItems(countedBarcodes,allItems);
    const expectText = [{barcode:'ITEM000001',
      name:'雪碧',
      price:3,
      unit:'瓶',
      count:5},
      {barcode:'ITEM000003',
        name:'荔枝',
        price:15,
        unit:'斤',
        count:2},
      {barcode:'ITEM000005',
        name:'方便面',
        price:4.5,
        unit:'袋',
        count:3},
    ];
    expect(cartItems).toEqual(expectText);
  });
});

// No #4
'use strict';
describe('pos', () => {
  it('should print buildPromotedItems', () => {
    const cartItems = [{barcode:'ITEM000001',
      name:'雪碧',
      price:3,
      unit:'瓶',
      count:5},
      {barcode:'ITEM000003',
        name:'荔枝',
        price:15,
        unit:'斤',
        count:2},
      {barcode:'ITEM000005',
        name:'方便面',
        price:4.5,
        unit:'袋',
        count:3},
    ];

    const promotions = loadPromotions();
    let  promotedItems = buildPromotedItems(cartItems,promotions);
    const expectText = [{barcode:'ITEM000001',
      name:'雪碧',
      price:3.00,
      unit:'瓶',
      count:5,
      payPrice :15.00,
      saved :0.00},
      {barcode:'ITEM000003',
        name:'荔枝',
        price:15.00,
        unit:'斤',
        count:2,
        payPrice :30.00,
        saved :0.00},
      {barcode:'ITEM000005',
        name:'方便面',
        price:4.50,
        unit:'袋',
        count:3,
        payPrice :13.50,
        saved :0.00}
    ];
    expect(promotedItems).toEqual(expectText);
  });
});

//No #5
'use strict';
describe('print pos', () => {
  it('should print Receipt', () => {
    const promotedItems = [{barcode:'ITEM000001',
      name:'雪碧',
      price:3.00,
      unit:'瓶',
      count:5,
      payPrice :15.00,
      saved :0.00},
      {barcode:'ITEM000003',
        name:'荔枝',
        price:15.00,
        unit:'斤',
        count:2,
        payPrice :30.00,
        saved :0.00},
      {barcode:'ITEM000005',
        name:'方便面',
        price:4.50,
        unit:'袋',
        count:3,
        payPrice :13.50,
        saved :0.00}
    ];

    let totalPrices = calculateTotalPrices (promotedItems);

    const expectText = {totalPayPrice:58.50,
      totalSaved:0.00};
    expect(totalPrices).toEqual(expectText);
  });
});

//No #6
//  'use strict';
describe('pos', () => {
  it('print creceiptItemsString', () => {
    const totalPrices = {totalPayPrice:58.50,
      totalSaved:0.00};

    const promotedItems = [{barcode:'ITEM000001',
      name:'雪碧',
      price:3.00,
      unit:'瓶',
      count:5,
      payPrice :15.00,
      saved :0.00},
      {barcode:'ITEM000003',
        name:'荔枝',
        price:15.00,
        unit:'斤',
        count:2,
        payPrice :30.00,
        saved :0.00},
      {barcode:'ITEM000005',
        name:'方便面',
        price:4.50,
        unit:'袋',
        count:3,
        payPrice :13.50,
        saved :0.00}
    ];
    let receipt = buildReceipt(promotedItems,totalPrices);
    const expectText = {
      receiptItems:[{
        name:'雪碧',
        price:3.00,
        unit:'瓶',
        count:5,
        payPrice :15.00
      },

        {
          name:'荔枝',
          price:15.00,
          unit:'斤',
          count:2,
          payPrice :30.00},
        {
          name:'方便面',
          price:4.50,
          unit:'袋',
          count:3,
          payPrice :13.50}],
      totalPayPrice:58.50,
      totalSaved:0.00
    };
    expect(receipt).toEqual(expectText)
  });
});
/**
 * Created by amber on 16-7-21.
 */
