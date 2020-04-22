//DB_CLASS
// SVET
function DB(){
    
    this.db_name = 'svet';
    this.db = window.openDatabase("Database4", "1.0", this.db_name, 200000);
    
       /*
     * 
     */
    this.insertData = function(obj,render_function_callback){
       this.db.transaction(function(tx) {
          // console.log("SELECT * FROM answer  WHERE id_question="+idq);
          //INSERT INTO LOGS (id, log) VALUES (1, "foobar")
                       tx.executeSql("INSERT INTO DATA (data,type,date) VALUES ('"+obj.data+"','"+obj.type+"','"+obj.date+"')", [], function(tx, result) {
                           render_function_callback(result.rows);                    
                       }, null)                 
       } ); 
     }
     this.getData =  function(type,render_function_callback){
       // var result2 = new Array();
       this.db.transaction(function(tx) {
           console.log("SELECT * FROM DATA  WHERE type='"+type+"' ");
                       tx.executeSql("SELECT * FROM DATA  WHERE type='"+type+"' ORDER BY id DESC LIMIT 20", [], function(tx, result) {
                       
                           render_function_callback(result.rows);                    
                       }, null)                 
       } ); 
     }
       /*
     * 
     */
    this.getAnswersByIdq = function(idq,render_function_callback){
       // var result2 = new Array();
       this.db.transaction(function(tx) {
          // console.log("SELECT * FROM answer  WHERE id_question="+idq);
                       tx.executeSql("SELECT * FROM answer  WHERE id_question="+idq, [], function(tx, result) {
                           render_function_callback(result.rows);                    
                       }, null)                 
       } ); 
     }
     
    
    /*
     * 
     */
    this.getQuestionByPos = function(idtest,pos,render_function_callback){
       // var result2 = new Array();
       this.db.transaction(function(tx) {
           console.log("SELECT * FROM question  WHERE id_test="+idtest+" LIMIT "+pos+", 1");
                       tx.executeSql("SELECT * FROM question  WHERE id_test="+idtest+" LIMIT "+pos+", 1", [], function(tx, result) {
                           render_function_callback(result.rows);                    
                       }, null)                 
       } ); 
     }
    
     /*
     * 
     */
    this.getQuestionById = function(id,render_function_callback){
       this.db.transaction(function(tx) {
                       tx.executeSql("SELECT * FROM question  WHERE id="+id+"", [], function(tx, result) {
                           render_function_callback(result.rows);                    
                       }, null)                 
       } ); 
     }
    /*
     * 
     */
    this.getTableByID = function(table,idobj,render_function_callback){
       // var result2 = new Array();
       this.db.transaction(function(tx) {
           console.log("SELECT * "+table+" USER WHERE '"+idobj.name+"'='"+idobj.val+"'" +idobj.cmd);
                       tx.executeSql("SELECT * FROM "+table+" WHERE "+idobj.name+"="+idobj.val, [], function(tx, result) {
                           render_function_callback(result.rows);
                           /*
                           for(var i = 0; i < result.rows.length; i++) {
                               console.log(result);
                               result2[i] = result.rows.item(i);
                                  
                           }
                           */
                       
                       }, null)
                   
       }
              
                       ); 
        //return result2;
     }
    
    
    
   //---------------------------------------------------------
   //ВЫПОЛНЯЕТ SQL ЗАПРОС И ВЫЗЫВАЕТ КОЛБАК ФУНКЦИЮ
    this.SQL_RENDER = function(sql,render_function_callback){
       this.db.transaction(function(tx) {
                       tx.executeSql(sql, [], function(tx, result) {render_function_callback(result.rows); }, null)                   
       }); 
     }
    //------------------------------------------------------
    /*
     * 
     */
    this.SQL = function(sql){
       this.db.transaction(function populateDB(tx) {tx.executeSql(sql);}, function(err) {console.log("Error processing SQL: "+err.message);}, function() {console.log("success!");});

    }
}//END_CLASS_DB
