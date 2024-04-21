export const RenderHtml=({htmlContent}:{htmlContent:string})=>{

    const createMarkup = (content:string) => {
        return { __html: content };
    };

    return <div dangerouslySetInnerHTML={createMarkup(htmlContent)}>
    </div>
}