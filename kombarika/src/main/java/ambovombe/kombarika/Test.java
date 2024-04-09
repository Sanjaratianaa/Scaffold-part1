package ambovombe.kombarika;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */

import ambovombe.kombarika.generator.CodeGenerator;
import ambovombe.kombarika.generator.service.DbService;

import java.util.HashMap;
/**
 *
 *  @author Mamisoa
 */
public class Test {

    /**
     * @param args the command line arguments
     * @throws SQLException
     */
     
    public static void main(String[] args) throws Exception {
        CodeGenerator codeGenerator = new CodeGenerator();
        String path = "./";
        String framework = "csharp:dotnet";
        String packageName = "Test";
        String entity = "Models";
        String controller = "Controllers";
        String repository = "Context";
        String view = "View";
        String viewType = "react";
        String auth = "Auth";
        String url = "http://localhost:5106/api";
        String secretKey = "FrameworkMrNainaAnayRehetraMiaraka";
        try{
            // String[] tables = {"district","region"};
            // DbConnection dbConnection = codeGenerator.getDbConnection();
            // String str = dbConnection.getListConnection().get(dbConnection.getInUseConnection()).getDatabaseType().getForeignKeyQuery();
            // str = str.replace("?", "commune");
            // System.out.println(str);
            // HashMap<String, String> foreignKeys = DbService.getForeignKeys(dbConnection, "commune");
            // for (Map.Entry<String, String> set : foreignKeys.entrySet()) {
            //     System.out.println(set.getKey() + " " + set.getValue());
            // }
            String[] tables = DbService.getAllTablesArrays(codeGenerator.getDbConnection());
            // for(String table: tables)
            //     System.out.println(table);
            // codeGenerator.generateAll(path, packageName, entity, controller, repository, view, viewType, url, tables, framework);
            // codeGenerator.generateEntity(path, "car", packageName+".entity", framework);
            // codeGenerator.testIfAuthReadedCorrectly();
            codeGenerator.generateAllWithAuth(path, packageName, entity, controller, repository, view, viewType, url, tables, framework, auth, secretKey );
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            codeGenerator.getDbConnection().close();
        }    
    }
}
