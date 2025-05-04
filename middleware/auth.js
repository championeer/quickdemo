/**
 * 认证中间件
 * 用于保护需要登录才能访问的路由
 */

/**
 * 检查用户是否已认证
 * 如果未认证，重定向到登录页面，或对API请求返回401状态码
 */
function isAuthenticated(req, res, next) {
  console.log('认证检查:');
  console.log('- 请求路径:', req.path);
  console.log('- 会话 ID:', req.session?.id);
  console.log('- 会话认证状态:', req.session?.isAuthenticated);
  console.log('- Cookie 认证状态:', req.cookies?.auth);
  console.log('- 认证功能启用:', req.app.locals.config.authEnabled);

  // 如果认证功能未启用，直接通过
  if (!req.app.locals.config.authEnabled) {
    console.log('- 认证功能未启用，直接通过');
    return next();
  }

  // 检查会话中是否有认证标记
  if (req.session && req.session.isAuthenticated) {
    console.log('- 会话认证成功，允许访问');
    return next();
  }

  // 检查 Cookie 中是否有认证标记
  if (req.cookies && req.cookies.auth === 'true') {
    console.log('- Cookie 认证成功，允许访问');
    // 如果只有 Cookie 认证成功，同步到会话
    req.session.isAuthenticated = true;
    return next();
  }

  // 未认证的处理
  console.log('- 未认证，根据请求类型处理');
  
  // 对API请求返回401状态码
  if (req.path.startsWith('/api/')) {
    console.log('- API请求，返回401未授权');
    return res.status(401).json({
      success: false,
      error: '未授权，请先登录',
      requiresAuth: true
    });
  }
  
  // 对页面请求重定向到登录页面
  console.log('- 页面请求，重定向到登录页面');
  res.redirect('/login');
}

module.exports = {
  isAuthenticated
};
