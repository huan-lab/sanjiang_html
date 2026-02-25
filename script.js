/**
 * 三江里弄·稻香公园网站功能脚本
 * 包含网站交互功能的实现，如移动端菜单、平滑滚动和导航栏效果
 * 遵循JavaScript最新语言标准和最佳实践
 */

/**
 * 移动端菜单功能模块
 * 处理移动端菜单的展开和收起
 */
class MobileMenu {
    constructor() {
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    /**
     * 初始化移动端菜单功能
     */
    init() {
        if (this.mobileMenu && this.navLinks) {
            this.mobileMenu.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
                this.toggleMenuIcon();
            });
        }
    }

    /**
     * 切换菜单图标状态（可选功能）
     * 可以添加动画效果来改变菜单图标的显示
     */
    toggleMenuIcon() {
        // 这里可以添加菜单图标切换的动画效果
        // 例如将三条横线转换为叉号
    }
}

/**
 * 平滑滚动功能模块
 * 实现页面内锚点的平滑滚动效果
 */
class SmoothScroll {
    constructor() {
        this.init();
    }

    /**
     * 初始化平滑滚动功能
     */
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 处理特殊板块的滚动逻辑
                    if (targetId === '#location-vr') {
                        this.scrollToLocationVr(targetElement);
                    } else if (targetId === '#spring2026') {
                        this.scrollToSpring2026(targetElement);
                    } else {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    
                    // 关闭移动端菜单（如果打开）
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                }
            });
        });
    }

    /**
     * 精确滚动到基地地理条件板块
     * 确保导航栏下边界与背景白绿色区域上部分界线完全对齐
     * @param {Element} targetElement 目标元素
     */
    scrollToLocationVr(targetElement) {
        // 计算导航栏高度
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // 计算目标元素的顶部位置
        const targetTop = targetElement.offsetTop;
        
        // 计算最终滚动位置
        const scrollPosition = targetTop - navbarHeight;
        
        // 执行平滑滚动
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }

    /**
     * 精确滚动到2026春季方案板块
     * 确保与参考图片中的视觉效果完全一致
     * @param {Element} targetElement 目标元素
     */
    scrollToSpring2026(targetElement) {
        // 计算导航栏高度
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // 计算目标元素的顶部位置
        const targetTop = targetElement.offsetTop;
        
        // 计算最终滚动位置（考虑导航栏高度，确保标题显示在合适位置）
        const scrollPosition = targetTop - navbarHeight - 20; // 添加20px的偏移量，使标题位置更接近参考图片
        
        // 执行平滑滚动
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * 导航栏滚动效果模块
 * 处理导航栏在滚动时的样式变化
 */
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    /**
     * 初始化导航栏滚动效果
     */
    init() {
        if (this.navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            });
        }
    }
}

/**
 * 页面加载完成后初始化所有功能
 */
function initWebsiteFeatures() {
    // 初始化移动端菜单
    new MobileMenu();
    
    // 初始化平滑滚动
    new SmoothScroll();
    
    // 初始化导航栏滚动效果
    new NavbarScroll();
}

// 当DOM加载完成后执行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebsiteFeatures);
} else {
    // 如果DOM已经加载完成，直接执行初始化
    initWebsiteFeatures();
}

// 导出模块（如果在模块化环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileMenu,
        SmoothScroll,
        NavbarScroll,
        initWebsiteFeatures
    };
}
