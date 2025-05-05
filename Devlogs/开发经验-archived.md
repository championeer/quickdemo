> 项目原作者开发经验总结

# HTML-Go Express 开发经验总结

## 1. 性能优化经验

### 1.1 粘贴操作与文件上传速度差异

在开发过程中，我们发现粘贴 HTML 代码的操作比上传 HTML 文件的操作慢很多。经过分析，主要原因如下：

#### 速度差异的原因

1. **处理方法不同**：
   - 文件上传使用直接赋值 `textContent = content`（高效）
   - 粘贴使用 `execCommand('insertText')` 命令（较慢）

2. **DOM操作复杂度**：
   - `execCommand` 需要处理光标位置、选区和编辑状态
   - 它会触发更多的DOM事件和浏览器重绘
   - 这些额外操作会导致性能损失

3. **额外处理步骤**：
   - 粘贴操作有滚动位置的保存和恢复
   - 有HTML实体编码的处理
   - 这些步骤增加了处理时间

#### 优化方案

我们通过以下方式优化了粘贴操作的性能：

```javascript
// 旧方法（慢）
document.execCommand('insertText', false, text);

// 新方法（快）
codeElement.textContent = text;
```

这个简单的改变显著提升了粘贴操作的速度，使其与文件上传速度相当。

### 1.2 语法高亮性能优化

对于大型 HTML 文件，语法高亮可能会导致界面卡顿。我们采取了以下优化措施：

1. **基于文本大小的智能处理**：
   ```javascript
   // 判断代码长度，如果超过一定长度则使用延迟高亮
   if (codeElement.textContent.length > 3000) {
     // 对于大型代码，使用 requestAnimationFrame 来提高性能
     requestAnimationFrame(() => {
       hljs.highlightElement(codeElement);
     });
   } else {
     hljs.highlightElement(codeElement);
   }
   ```

2. **提供高亮切换功能**：
   - 允许用户关闭语法高亮，显著提升大文件的处理速度
   - 使用视觉指示器显示高亮状态

3. **延迟处理大文件**：
   - 对于超过 5000 字符的文件，使用 setTimeout 延迟处理
   - 显示加载指示器提供更好的用户体验

## 2. UI/UX 优化经验

### 2.1 界面简化

我们将原本的标签切换界面简化为单一界面：

1. **移除标签切换**：不再有
