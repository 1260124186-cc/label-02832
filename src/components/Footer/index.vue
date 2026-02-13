<template>
  <footer class="footer">
    <!-- 服务保障 -->
    <div class="service-guarantee">
      <div class="container">
        <div class="service-list">
          <div v-for="service in services" :key="service.id" class="service-item">
            <el-icon :size="32"><component :is="service.icon" /></el-icon>
            <div class="service-info">
              <h4>{{ service.title }}</h4>
              <p>{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 帮助中心 -->
    <div class="help-center">
      <div class="container">
        <div class="help-columns">
          <div v-for="column in helpColumns" :key="column.title" class="help-column">
            <h3 class="column-title">{{ column.title }}</h3>
            <ul class="column-links">
              <li v-for="link in column.links" :key="link">
                <a href="javascript:void(0)" @click="handleClick">{{ link }}</a>
              </li>
            </ul>
          </div>
          
          <!-- 联系我们 -->
          <div class="contact-column">
            <h3 class="column-title">联系我们</h3>
            <div class="contact-info">
              <div class="hotline">
                <p class="phone">400-606-5500</p>
                <p class="time">客服热线 8:00-22:00</p>
              </div>
              <div class="qrcode">
                <div class="qr-placeholder">
                  <el-icon :size="40"><Iphone /></el-icon>
                </div>
                <p>京东APP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 友情链接 -->
    <div class="friend-links">
      <div class="container">
        <div class="links-row">
          <span class="label">友情链接：</span>
          <a v-for="link in friendLinks" :key="link" href="javascript:void(0)" @click="handleClick">{{ link }}</a>
        </div>
      </div>
    </div>
    
    <!-- 版权信息 -->
    <div class="copyright">
      <div class="container">
        <div class="copyright-links">
          <a href="javascript:void(0)" @click="handleClick">关于我们</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">联系我们</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">人才招聘</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">商家入驻</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">广告服务</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">手机京东</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">友情链接</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">销售联盟</a>
          <span class="divider">|</span>
          <a href="javascript:void(0)" @click="handleClick">京东社区</a>
        </div>
        
        <div class="copyright-text">
          <p>
            <a href="javascript:void(0)" @click="handleClick">京公网安备 11000002000088号</a>
            <span class="divider">|</span>
            <a href="javascript:void(0)" @click="handleClick">京ICP备11041704号</a>
            <span class="divider">|</span>
            <a href="javascript:void(0)" @click="handleClick">京ICP证070359号</a>
          </p>
          <p>
            Copyright © 2004-{{ currentYear }} 京东JD.com 版权所有
          </p>
          <p class="note">
            注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。
          </p>
        </div>
        
        <div class="certification">
          <div v-for="cert in certifications" :key="cert.name" class="cert-item">
            <div class="cert-icon">
              <el-icon :size="20"><component :is="cert.icon" /></el-icon>
            </div>
            <span>{{ cert.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Van, CreditCard, Service, CircleCheck, 
  Iphone, Medal, Lock, Document
} from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

const currentYear = computed(() => new Date().getFullYear())

const handleClick = () => {
  showDevelopingToast()
}

const services = ref([
  { id: 1, icon: 'Van', title: '品类齐全', desc: '轻松购物' },
  { id: 2, icon: 'CreditCard', title: '多仓直发', desc: '极速配送' },
  { id: 3, icon: 'CircleCheck', title: '正品行货', desc: '精致服务' },
  { id: 4, icon: 'Service', title: '天天低价', desc: '畅选无忧' },
  { id: 5, icon: 'Lock', title: '准时送达', desc: '售后无忧' }
])

const helpColumns = ref([
  {
    title: '购物指南',
    links: ['购物流程', '会员介绍', '生活旅行', '常见问题', '大家电', '联系客服']
  },
  {
    title: '配送方式',
    links: ['上门自提', '211限时达', '配送服务查询', '配送费收取标准', '海外配送']
  },
  {
    title: '支付方式',
    links: ['货到付款', '在线支付', '分期付款', '邮局汇款', '公司转账']
  },
  {
    title: '售后服务',
    links: ['售后政策', '价格保护', '退款说明', '返修/退换货', '取消订单']
  }
])

const friendLinks = ref([
  '京东商城', '京东金融', '京东云', '京东物流', '京东健康',
  '京东国际', '京东超市', '京东生鲜', '京东到家', '京东拍卖'
])

const certifications = ref([
  { name: '经营证照', icon: 'Document' },
  { name: '诚信网站', icon: 'Medal' },
  { name: '网警备案', icon: 'Lock' }
])
</script>

<style lang="scss" scoped>
.footer {
  background: $color-white;
  margin-top: $spacing-xl;
}

// 服务保障
.service-guarantee {
  border-bottom: 1px solid $border-light;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
  
  .service-list {
    display: flex;
    justify-content: space-between;
    padding: $spacing-lg 0;
  }
  
  .service-item {
    display: flex;
    align-items: center;
    
    .el-icon {
      color: $jd-red;
      margin-right: $spacing-md;
    }
    
    .service-info {
      h4 {
        font-size: $font-size-base;
        font-weight: $font-weight-bold;
        color: $color-text-primary;
        margin-bottom: 4px;
      }
      
      p {
        font-size: $font-size-xs;
        color: $color-text-secondary;
      }
    }
  }
}

// 帮助中心
.help-center {
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: $spacing-xl $spacing-md;
  }
  
  .help-columns {
    display: flex;
    justify-content: space-between;
  }
  
  .help-column {
    .column-title {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
      margin-bottom: $spacing-md;
      padding-bottom: $spacing-sm;
      border-bottom: 1px solid $border-light;
    }
    
    .column-links {
      li {
        margin-bottom: $spacing-sm;
        
        a {
          font-size: $font-size-sm;
          color: $color-text-secondary;
          
          &:hover {
            color: $jd-red;
          }
        }
      }
    }
  }
  
  .contact-column {
    .column-title {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
      margin-bottom: $spacing-md;
      padding-bottom: $spacing-sm;
      border-bottom: 1px solid $border-light;
    }
    
    .contact-info {
      display: flex;
      gap: $spacing-lg;
      
      .hotline {
        .phone {
          font-size: $font-size-xl;
          font-weight: $font-weight-bold;
          color: $jd-red;
          margin-bottom: $spacing-xs;
        }
        
        .time {
          font-size: $font-size-xs;
          color: $color-text-secondary;
        }
      }
      
      .qrcode {
        text-align: center;
        
        .qr-placeholder {
          width: 80px;
          height: 80px;
          background: $color-white;
          border: 1px solid $border-light;
          border-radius: $radius-md;
          @include flex-center;
          color: $color-text-placeholder;
          margin-bottom: $spacing-xs;
        }
        
        p {
          font-size: $font-size-xs;
          color: $color-text-secondary;
        }
      }
    }
  }
}

// 友情链接
.friend-links {
  border-top: 1px solid $border-light;
  border-bottom: 1px solid $border-light;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: $spacing-md;
  }
  
  .links-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    .label {
      font-size: $font-size-xs;
      color: $color-text-secondary;
      margin-right: $spacing-sm;
    }
    
    a {
      font-size: $font-size-xs;
      color: $color-text-placeholder;
      margin-right: $spacing-md;
      
      &:hover {
        color: $jd-red;
      }
    }
  }
}

// 版权信息
.copyright {
  background: #333;
  color: #999;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: $spacing-lg $spacing-md;
    text-align: center;
  }
  
  .copyright-links {
    margin-bottom: $spacing-md;
    
    a {
      font-size: $font-size-xs;
      color: #999;
      
      &:hover {
        color: $color-white;
      }
    }
    
    .divider {
      margin: 0 $spacing-sm;
      color: #666;
    }
  }
  
  .copyright-text {
    margin-bottom: $spacing-md;
    
    p {
      font-size: $font-size-xs;
      line-height: 2;
      
      a {
        color: #999;
        
        &:hover {
          color: $color-white;
        }
      }
      
      .divider {
        margin: 0 $spacing-sm;
        color: #666;
      }
    }
    
    .note {
      color: #666;
      margin-top: $spacing-sm;
    }
  }
  
  .certification {
    display: flex;
    justify-content: center;
    gap: $spacing-lg;
    
    .cert-item {
      display: flex;
      align-items: center;
      font-size: $font-size-xs;
      color: #999;
      
      .cert-icon {
        width: 32px;
        height: 32px;
        background: #444;
        border-radius: $radius-sm;
        @include flex-center;
        margin-right: $spacing-sm;
        
        .el-icon {
          color: #999;
        }
      }
      
      &:hover {
        color: $color-white;
        
        .cert-icon {
          background: #555;
          
          .el-icon {
            color: $color-white;
          }
        }
      }
    }
  }
}
</style>
