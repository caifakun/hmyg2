// components/tarBar/tarbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:Array,
      value:''
    },
    currentIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleIndex(e){
      // console.log(e);
      const {index} = e.currentTarget.dataset;
      this.triggerEvent('ChangeIndex',{index});
    }
  }
})
