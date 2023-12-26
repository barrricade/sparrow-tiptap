import React, { useEffect, useRef, useState } from 'react'
import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
import { Menu } from 'antd';
import SvgIcon from '@/components/SvgIcon'
const CustomFloatingMenu = (props) => {
    const { editor } = useCurrentEditor()
    const componentRef = useRef(null)
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [])
    // 下拉框打开时默认的选中项
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('text');
    //OPTIMIZE: 添加了一个是否打开菜单栏的参数，控制arrowDown按键的事件
    let isMenuOpen = false
    // 下拉框按键事件
    const handleKeyDown = (event) => {
        if (!isMenuOpen) return;
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            const menu = componentRef.current.menu.list
        }
    }
    // 菜单点击事件
    const handleClick = ({ key }) => {
        let level = editor.getAttributes("heading").level

        if (key == 'text') {
            editor.chain().focus().setParagraph().run()
        }

        // if (key == 'blockquote') {
        //     if (level) {
        //         editor.chain().focus().toggleHeading({ level }).run()
        //     }
        //     editor.chain().focus().setBlockquote().run()
        //     return
        // }

        let match = key.match(/^h(\d)$/)
        if (match) {
            editor.chain()
                .setHeading({ level: parseInt(match[1]) })
                .focus()
                .run()
        }
    }
    // 生成菜单项
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('基本', 'grp', null, [getItem('文本', 'text', <SvgIcon name="text" className="floating-menu__icon"></SvgIcon>),
        getItem('一级标题', 'h1', <SvgIcon name="h1" className="floating-menu__icon"></SvgIcon>),
        getItem('二级标题', 'h2', <SvgIcon name="h2" className="floating-menu__icon"></SvgIcon>),
        getItem('三级标题', 'h3', <SvgIcon name="h3" className="floating-menu__icon"></SvgIcon>),
        getItem('四级标题', 'h4', <SvgIcon name="h4" className="floating-menu__icon"></SvgIcon>),
        getItem('五级标题', 'h5', <SvgIcon name="h5" className="floating-menu__icon"></SvgIcon>),
        getItem('六级标题', 'h6', <SvgIcon name="h6" className="floating-menu__icon"></SvgIcon>),
        getItem('七级标题', 'h7', <SvgIcon name="h7" className="floating-menu__icon"></SvgIcon>)], 'group'),
    ];
    // textNode的内容为/或者、时，并且编辑器可编辑时，显示菜单
    const shouldShow = ({ editor, view, state, oldState }) => {
        const { $cursor } = state.selection;
        const textNode = $cursor.nodeBefore;
        const paragraphNode = $cursor.node();
        if (paragraphNode.type.name == 'paragraph') {
            setDefaultSelectedKeys('text')
        } else if (paragraphNode.type.name == 'heading') {
            setDefaultSelectedKeys('h' + $cursor.node().type.defaultAttrs.level)
        }
        // textNode的内容为/或者、时，并且编辑器可编辑时，显示菜单
        if (textNode && (textNode.text === '/' || textNode.text == '、') && editor.isEditable) {
            isMenuOpen = true
            return true;
        }
    }
    // 下拉框的样式
    const tippyOptions = {
        placement: "bottom",
        theme: "light",
        interactive: true,
        allowHTML: true,
        delay: 0.1,
        animation: "shift-away",
        onShow: (instance) => {
            const menu = instance.popper.firstChild;

            Object.assign(menu.style, {
                backgroundColor: "#fff",
                borderRadius: "4px",
                color: "#333",
                padding: "4px 8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
            });
            menu.style.removeProperty("max-width");

            // 删除三角形
            menu.querySelector('.tippy-arrow').remove();
        },
        onShown(instance) {
            componentRef.current.focus()
        },
    }
    return (
        <FloatingMenu editor={editor} tippyOptions={tippyOptions} shouldShow={shouldShow}>
            <Menu
                ref={componentRef}
                tabIndex={1}
                onClick={handleClick}
                style={{
                    width: 256,
                    height: 180,
                    overflow: 'auto',
                    border: 'none'
                }}
                defaultSelectedKeys={['text']}
                mode="inline"
                items={items}
            />
        </FloatingMenu>
    )
}
export default CustomFloatingMenu