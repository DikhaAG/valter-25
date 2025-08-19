import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
        "cursor-pointer disabled:cursor-none border-4 shadow-[7px_7px_0px_#00000040] hover:shadow-none disabled:shadow-none border-foreground -translate-y-1 -translate-x-1 hover:translate-0 disabled:translate-0  inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        {
                variants: {
                        variant: {
                                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                                outline: "bg-background hover:bg-foreground/20 hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                                secondary: "bg-secondary/90 hover:bg-secondary text-secondary-foreground",
                                gosong: "bg-foreground/90 border-4 border-foreground text-secondary-foreground"
                        },
                        size: {
                                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                                icon: "size-9",
                        },
                },
                defaultVariants: {
                        variant: "default",
                        size: "default",
                },
        }
);

function Button({
        className,
        variant,
        size,
        asChild = false,
        ...props
}: React.ComponentProps<"button"> &
        VariantProps<typeof buttonVariants> & {
                asChild?: boolean;
        }) {
        const Comp = asChild ? Slot : "button";

        return (
                <Comp
                        data-slot="button"
                        className={cn(
                                buttonVariants({ variant, size, className })
                        )}
                        {...props}
                />
        );
}

export { Button, buttonVariants };
