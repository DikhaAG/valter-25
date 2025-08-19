import React from "react";
interface Props {
          children: React.ReactNode
}
export default function AdminLayout({children}: Props) {
          return (
                    <div className="">
                              <div className="">Admin Layout</div>
                              <div className="">{children}</div>
                    </div>
          )
}