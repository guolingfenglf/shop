<template>
  <el-container class="home">
    <el-header>
      <!-- 左侧 -->
      <div class="logo-box">
        <img width="50" src="../assets/logo.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <!-- 右侧 -->
      <el-button>退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#399bfb"
        >
          <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              v-for="(item1, index1) in item.children"
              :key="index1"
              :index="item1.path"
            >{{item1.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    };
  },
  async created() {
    const menus = await this.axios.get("/menus", {
      headers: { Authorization: sessionStorage.getItem("token") }
    });
    // console.log(menus);
    if (menus.data.meta.status != 200)
      return this.$message.error("获取菜单列表失败");
    this.menuList = menus.data.data;
  }
};
</script>
<style>
.home .el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.home .el-header img {
  vertical-align: middle;
}
.el-container {
  height: 100%;
}
.home .el-aside {
  background-color: #333743;
  height: 100%;
  border-right: none;
}
</style>