import "./CommonLayout.scss";

const CommonLayout =({children}) =>{

  return(
      <>
      <div>
          {/* <ToolBar/>
          <Sides/>
          <Backdrop/> */}
      </div>
      <main>{children}</main>
      </>
  )
}

export default CommonLayout;