var zttx={goFirst:function(a){var b=$("#currentPage");null!=b&&(b.val(1),$Z.changPage(a))},goPrevious:function(a){var b=$("#currentPage");null!=b&&1!=parseInt(b.val())&&(b.val(parseInt(b.val())-1),$Z.changPage(a))},goNext:function(a){var b=$("#currentPage"),c=$("#totalPage");null!=b&&parseInt(b.val())!=parseInt(c.val())&&(b.val(parseInt(b.val())+1),$Z.changPage(a))},goLast:function(a,b){var c=$("#currentPage");null!=c&&(c.val(b),$Z.changPage(a))},goPage:function(a,b){var c=$("#currentPage");null!=c&&(c.val(b),$Z.changPage(a))},changPage:function(a){a.submit()},loadPage:function(a,b,c,d){$("#"+c).html("");var e=$("#"+a).serialize();b=b+"?currentPage="+d+"&"+e,$("#"+c).load(b)}};window.zttx=window.$Z=zttx;