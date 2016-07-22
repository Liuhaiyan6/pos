/**
 * Created by amber on 16-7-22.
 */
let tags =
  [
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

function  loadAllItems() {
  return[{barcode:'ITEM000001',
    name:'雪碧',
    price:3,
    unit:'瓶',
    count:5,
    category:'食品',
    subCateGory:'碳酸饮料'
  },
    {barcode:'ITEM000003',
      name:'荔枝',
      price:15,
      unit:'斤',
      count:2,
      category:'水果',
      subCateGory:'营养水果'},
    {barcode:'ITEM000005',
      name:'方便面',
      price:4.5,
      unit:'袋',
      count:3,
      category:'食品',
      subCateGory:'垃圾零食'}];

}

function loadPromotions() {
  return[
    {
      type: 'BUY_THREE_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001'
      ]
    },
    {
      type: 'OTHER_PROMOTION',
      barcodes: [
        'ITEM000003',
        'ITEM000004'
      ]
    }
  ]
}

function getFormattedItems(tags) {
  let result =[];
  for( tag of tags){
    if(tag.indexOf('-')===-1){
      // result.push({barcode:tag,count:1});
      result.push({count:1,barcode:tag});
    }else{
      let temps = tag.split('-');

      result.push({count:parseInt(temps[1]),barcode:temps[0]});
    }
  }
  return result;
}

function getExistElementByBarcodes(array,barcode) {
  for (let countItem of array) {
    if (countItem.barcode === barcode) {
      return countItem;
    }
  }
  return null;
}

function getCountItems(formattedTags){
  let result = [];
  for(let formattedTag  of formattedTags){
    let countItem = getExistElementByBarcodes(result,formattedTag.barcode);
    if (countItem ===null){
      // result.push({barcode:formattedTag.barcode,count:formattedTag.count});
      result.push({count: formattedTag.count, barcode: formattedTag.barcode});
    }else{
      countItem.count += formattedTag.count
    }
  }
  return result;
}




function buildCartItems(allItems,countedBarcodes) {
  let result = [];
  for(let countedBarcode of countedBarcodes){
    let  item = getExistElementByBarcodes(allItems,countedBarcode.barcode);

    let cartItem = {
      barcode:item.barcode,
      name :item.name,
      price:item.price,
      unit:item.price,
      count:countedBarcode.count,
      category:item.category,
      subCateGory:item.subCateGory
    };
    console.log(result);
    result.push(cartItem);
  }
  return result;

}


function  _fixPrice(number) {
  return parseFloat(number.toFixed(2))

}


function buildPromotionItems(allItems,promotions) {
  let result = [];
  let currentPromotion = promotions.find(promotion=>promotion.type === '单品出售商品');
  return cartItems.map((cartItem)=> {
    let hasPromoted = currentPromotion.barcodes.includes(cartItem.barcode) && cartItem.count > 10;
    let totalPrice = cartItem.price * cartItem.count;
    let saved = hasPromoted ? tatalPrice * 0.05 : 0;
    let payPrice = tatalPrice - saved;
    return Object.assign({}, cartItem, {
      payPrice, saved: _fixPrice(saved)
    })
  })

}



function  buildPromotedItems(cartItems,loadPromotions) {
  let result=[];
  let payPrice = 0;
  let saved = 0;
  let hasPromoted;
  for (cartItem of cartItems.barcode) {
    for (currentPromotion of currentPromotions.barcode) {
        if (cartItems.barcode === barcode) {
          hasPromoted = true;
        }
        for (currentPromotion of currentPromotion.type) {
          if(currentPromotion.type = "BUY _TWO_GET_ONE_FREE"){
            var countSaved = Math.floor(cartItem.count/3);
            saved =  cartItem.price *countSaved;
          } else if (currentPromotion.type = "BUY_MORE_TEN_DISCOUNT_JIUWU" && countedBarcode.count >10){
            saved = countedBarcode.count * cartItem.price *0.95
          }

      }
    }
  }

  payPrice = cartItem.price *cartItem.count - saved;
  result.push({barcode:cartItem.barcode,
    name:cartItem.name,
    price:cartItem.price,
    unit:cartItem.unit,
    count:cartItem.count,
    payPrice,
    saved
  });
  console.log(result);
  return result;
}

function calculateTotalPrices (promotedItems) {
  let result = {
    totalPayPrice: 0,
    totalSaved: 0
  };
  for (let element of promotedItems) {
    result.totalPayPrice += element.payPrice;
    result.totalSaved += element.saved;
  }
  return result;
}

function buildReceipt(promotedItems,totalPrices) {
  let receiptItems = [];
  for (let element of promotedItems){

    receiptItems.push({
      name:element.name,
      price:element.price,
      unit:element.unit,
      count:element.count,
      payPrice:element.payPrice
    });
  }
  return{
    receiptItems,
    totalPayPrice:totalPrices.totalPayPrice,
    totalSaved:totalPrices.totalSaved
  }
}

function buildReceiptString(receipt) {
  let line = ['******<没赚钱商店>购物清单******'];
  for (let {name,count,unit,price,payPrice,sdanjaaved} of receipt.promotedItems){
    let line = '名称:${name},数量:${count}${uit},单价:${price.toFixed(2)(元),小计:${payPrice.toFixed(2)}(元)';
    if(saved > 0){
      line += ',优惠:${saved.toFixed(2)}(元)'
    }
    line.push(line)
  }
  let hasSaved = receipt.savedItems.length > 0;
  if(hasSaved){
    lines.push('-------------');
    lines.push('批发价出售商品');
    for(let {name,count,unit} of receipt.savedItems){
      lines.push('名称:${name},数量:${count}${unit}');
    }
  }
  lines.push('-------------');
  lines.push('总计:${receipt.totalPayPrice.toFixed(2)}(元)');
  if(hasSaved){
    lines.push('节省:${receipt.totalPayPrice.toFixed(2)}(元)');
  }
  lines.push('****************');
  let receiptString = line.join('\n');
  console.log(receiptString);
}
