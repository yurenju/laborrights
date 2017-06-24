import Vue from 'vue'
import Welcome from '@/components/Welcome'
import router from '@/router'

describe('Welcome.vue', () => {
  it('should render .welcome block', () => {
    const Constructor = Vue.extend(Welcome)
    const vm = new Constructor({router}).$mount()
    expect(vm.$el.classList.contains('welcome')).ok
  })
})
