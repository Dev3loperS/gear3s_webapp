import {arrow, FloatingPortal, hide, useFloating, shift, offset, type Placement} from '@floating-ui/react';
import { useRef, useState, useId, ElementType } from "react";
import { motion , AnimatePresence } from "framer-motion";
interface Props {
    children: React.ReactNode
    renderPopover: React.ReactNode
    className?: string
    as?: ElementType
    initialOpen?: boolean
    placement?: Placement
}
export default function Popover({children, className, renderPopover, as: Element = 'div', placement = 'bottom-end'}: Props) {
    const [open, setOpen] = useState(null);
    const arrowRef = useRef<HTMLElement>(null)
    const { x, y, reference, floating, strategy , middlewareData } = useFloating({
      middleware: [offset(), shift(), arrow({element: arrowRef})],
      placement: placement
    })    
    const id = useId()
    const showPopover = () => {
      setOpen(true);
    }
    const hidePopover = () => {
      setOpen(false);
    }
    return (
        <div className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
            {children}
            <FloatingPortal id={id}>
                <AnimatePresence>
                {open && (
                    <motion.div 
                        ref={floating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                            width: 'max-content',
                            transformOrigin: `${middlewareData.arrow?.x}px top`,
                        }}
                        initial={{ opacity: 0, transform: 'scale(0)'}}
                        animate={{ opacity: 1, transform: 'scale(1)'}}
                        exit={{ opacity: 0, transform: 'scale(0)'}}
                        transition={{duration: 0.2}}
                    >
                        <span 
                            ref={arrowRef} 
                            className="border-x-transparent border-t-transparent border-[11px] absolute translate-y-[-99%]"
                            style={{
                                left: middlewareData.arrow?.x,
                                top: middlewareData.arrow?.y,
                            }}
                        />
                        {renderPopover}
                    </motion.div>
                    )  
                }
                </AnimatePresence>
            </FloatingPortal>
        </div>
    )
}
