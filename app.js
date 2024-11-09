
const http=require('http');
const fs=require('fs')
const url=require('url')
const replaceHtml=require('./moduls/replaceHtml')











const server=http.createServer((req,res)=>{
    console.log('hi from the server');
    let {query,pathname:path}=url.parse(req.url,true)
    // console.log(x);
    
    // const path=req.url

    const html=fs.readFileSync('./files/index.html', 'utf-8')
    const products=JSON.parse(fs.readFileSync('./files/products.json', 'utf-8'))
    const productListHtml=fs.readFileSync('./files/product-list.html', 'utf-8')
    const productDetailHtml=fs.readFileSync('./files/product-details.html', 'utf-8')

 
   
    // function replaceHtml(template, product) {
    //     let output = template.replace('{{%IMAGE%}}', product.productImage);
    //     output = output.replace('{{%NAME%}}', product.name);
    //     output = output.replace('{{%MODELNAME%}}', product.modeName);
    //     output = output.replace('{{%MODELNO%}}', product.modelNumber);
    //     output = output.replace('{{%SIZE%}}', product.size);
    //     output = output.replace('{{%CAMERA%}}', product.camera);
    //     output = output.replace('{{%PRICE%}}', product.price);
    //     output = output.replace('{{%COLOR%}}', product.color);
    //     output = output.replace('{{%ID%}}', product.id);
    //     output = output.replace('{{%ROM%}}', product.ROM);
    //     output = output.replace('{{%DESC%}}', product.Description);
    //     return output
     
    // }
    if (path==='/'||path.toLowerCase()==='/home') {
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'my-header':'Hello World!'

        })
        res.end(html.replace('{{%CONTENT%}}', 'you are in  home page'))
    }else if (path.toLocaleLowerCase()==='/about'){
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'my-header':'Hello World!'

        })

        res.end(html.replace('{{%CONTENT%}}', 'you are in  about page'))


    }else if (path.toLocaleLowerCase()==='/contact'){
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'my-header':'Hello World!'

        })

        res.end(html.replace('{{%CONTENT%}}', 'you are in  contact page'))


    }else if (path.toLocaleLowerCase()==='/products'){
       
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'my-header':'Hello World!'

        })

        if(!query.id){
            let productsHmtlArray=products.map((prod)=>{
               return replaceHtml(productListHtml,prod)
            })
        let  productResponseHtml=html.replace('{{%CONTENT%}}', productsHmtlArray.join(',') )
        res.end(productResponseHtml)


        }else{
            let prod=products[query.id]
            let productDetailResponse=replaceHtml(productDetailHtml,prod)
            res.end(html.replace('{{%CONTENT%}}', productDetailResponse))
        }

    
       

    }else{
        res.writeHead(404)

        res.end(html.replace('{{%CONTENT%}}', 'page not found 404'))

    }
        
    
    
})


server.listen(8000,'127.0.0.1',()=>{
    console.log('server has started');
    
})