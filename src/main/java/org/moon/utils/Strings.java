package org.moon.utils;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Collection;

/**
 * 字符串处理类
 * @author Gavin
 * @Date Dec 30, 2013 3:06:04 PM
 */
public class Strings {
    
    /**
     * 首字母小写
     * @param src
     * @return
     */
    public static String lowerFirst(String src){
        if(src==null||src.length()==0){
            return "";
        }
        return src.substring(0, 1).toLowerCase()+src.substring(1);
    }
    
    /**
     * 从输入流捕获内容
     * @param in
     * @return
     */
    public static String getContentFromInputStream(InputStream in){
        return getContentFromInputStream(in,Charset.defaultCharset().name());
    }
    
    public static String getContentFromInputStream(InputStream in,String charset){
        StringBuffer dist = new StringBuffer();
        byte[] data = new byte[1024];
        int readNum = -1;
        try{
            while((readNum=in.read(data))!=-1){
                dist.append(new String(data,0,readNum, charset));
            }
            in.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return dist.toString();
    }
    
    /**
     * 截取字符串，当截取长度大于最大能截取的长度时，直接返回最大长度的子字符串。该方法返回的结果的长度应该小于或等于count
     * @param src 需要截取的原字符串
     * @param startIndex 开始位置
     * @param count 截取的最大长度
     * @return
     */
    public static String subString(String src,int startIndex,int count){
    	if(src==null){
    		return "";
    	}
    	byte[] stringBytes = src.getBytes();
    	if(startIndex<0){
    		startIndex = 0;
    	}
    	if(count>stringBytes.length-startIndex){
    		count = stringBytes.length-startIndex;
    	}
    	return new String(stringBytes,startIndex,count);
    }
    
    /**
     * 将驼峰命令方式修改为下划线方式
     * @param src
     * @return
     */
    public static String changeCamelBakToUnderline(String src){
    	return src.replaceAll("([A-Z])", "_$1").toLowerCase();
    }
    
    /**
     * 是否两端加单引号，只对String和Character有效
     * @param o
     * @return
     */
    public static String wrapIfNecessary(Object o){
    	if(o==null){
			return "";
		}
		if(o instanceof String||o instanceof Character){
			return "'"+o+"'";
		}
		return o.toString();
    }
    
    /**
     * 将集合中的所有值连接为以 delimiter分割的字符串，分隔符默认是逗号
     * @param values
     * @param delimiter
     * @return
     */
    public static String join(Collection<? extends Object> values,String delimiter){
    	if(Objects.isNull(values)||values.size()==0){
    		return "";
    	}
    	
    	if(Objects.isNull(delimiter)){
    		delimiter = ",";
    	}
    	
    	boolean begin = true;
    	StringBuffer sb = new StringBuffer();
    	
    	for(Object o:values){
    		if(begin){
    			begin = false;
    		}else{
    			sb.append(o);
    		}
    		sb.append(delimiter);
    	}
    	if(sb.length()>0){
    		sb.deleteCharAt(0);
    	}
    	return sb.toString();
    }
    
    /**
     * 将集合中的所有值,通过StringCustomerHandler处理后,连接为以 delimiter分割的字符串，分隔符默认是逗号
     * @param values
     * @param delimiter
     * @param handler
     * @return
     */
    public static  <T> String  join(Collection<T> values,String delimiter,StringCustomerHandler<T> handler){
    	if(Objects.isNull(values)||values.size()==0){
    		return "";
    	}
    	
    	boolean begin = true;
    	if(Objects.isNull(delimiter)){
    		delimiter = ",";
    	}
    	StringBuffer sb = new StringBuffer();
    	for(T o:values){
    		if(begin){
    			begin = false;
    		}else{
    			sb.append(delimiter);
    		}
    		sb.append(handler.handle(o));
    	}
    	return sb.toString();
    }
    
    /**
     * 自定义解析值的方法
     */
	public  static interface StringCustomerHandler<T>{
		String handle(T t);
	}
}
