<template>
  <footer class="footer">
    <!-- 服务保障 -->
    <div class="service-guarantee">
      <div class="container">
        <div class="service-list">
          <div v-for="service in services" :key="service.id" class="service-item">
            <el-icon :size="32">
              <component :is="service.icon" />
            </el-icon>
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
            <h3 class="column-title">
              {{ column.title }}
            </h3>
            <ul class="column-links">
              <li v-for="link in column.links" :key="link">
                <a href="javascript:void(0)" @click="handleClick">{{ link }}</a>
              </li>
            </ul>
          </div>

          <!-- 联系我们 -->
          <div class="contact-column">
            <h3 class="column-title">
              联系我们
            </h3>
            <div class="contact-info">
              <div class="hotline">
                <p class="phone">
                  {{ contact.hotline }}
                </p>
                <p class="time">
                  {{ contact.serviceTime }}
                </p>
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
          <a
            v-for="link in friendLinks"
            :key="link"
            href="javascript:void(0)"
            @click="handleClick"
          >{{ link }}</a>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">
      <div class="container">
        <div class="copyright-links">
          <template v-for="(link, index) in copyrightLinksData" :key="link.name">
            <a href="javascript:void(0)" @click="handleClick">{{ link.name }}</a>
            <span v-if="index < copyrightLinksData.length - 1" class="divider">|</span>
          </template>
        </div>

        <div class="copyright-text">
          <p>
            <template v-for="(item, index) in filingInfoData" :key="item.name">
              <a href="javascript:void(0)" @click="handleClick">{{ item.name }}</a>
              <span v-if="index < filingInfoData.length - 1" class="divider">|</span>
            </template>
          </p>
          <p>
            Copyright © {{ copyright.startYear }}-{{ currentYear }} {{ copyright.company }} 版权所有
          </p>
          <p class="note">
            {{ copyright.note }}
          </p>
        </div>

        <div class="certification">
          <div v-for="cert in certifications" :key="cert.name" class="cert-item">
            <div class="cert-icon">
              <el-icon :size="20">
                <component :is="cert.icon" />
              </el-icon>
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

// 从 mock 数据导入
import {
  serviceGuarantees,
  helpColumns as mockHelpColumns,
  contactInfo,
  friendLinks as mockFriendLinks,
  copyrightLinks,
  filingInfo,
  certifications as mockCertifications,
  copyrightText
} from '@/mock/footer'

const currentYear = computed(() => new Date().getFullYear())

const handleClick = () => {
  showDevelopingToast()
}

// 使用 mock 数据
const services = ref(serviceGuarantees)
const helpColumns = ref(mockHelpColumns)
const contact = ref(contactInfo)
const friendLinks = ref(mockFriendLinks)
const copyrightLinksData = ref(copyrightLinks)
const filingInfoData = ref(filingInfo)
const certifications = ref(mockCertifications)
const copyright = ref(copyrightText)
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
