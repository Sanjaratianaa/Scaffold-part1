package ambovombe.kombarika.generator.service.view;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ambovombe.kombarika.configuration.mapping.FrameworkProperties;
import ambovombe.kombarika.configuration.mapping.ViewProperties;
import ambovombe.kombarika.database.DbConnection;
import ambovombe.kombarika.generator.parser.FileUtility;
import ambovombe.kombarika.generator.service.DbService;
import ambovombe.kombarika.generator.utils.ObjectUtility;
import ambovombe.kombarika.utils.Misc;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class View {
    ViewProperties viewProperties;
    FrameworkProperties frameworkProperties;

    public String getInputInsert(HashMap<String, String> columns, HashMap<String, String> foreignKeys, List<String> primaryKeys, String url, String id, String attribute) throws Exception{
        String res ="";
        String template = this.getViewProperties().getInputInsert();
        for (Map.Entry<String, String> set : columns.entrySet()) {
            if (!primaryKeys.contains(set.getKey())) {
                String temp = foreignKeys.get(set.getKey());
                if(temp != null){
                    String option = this.getViewProperties().getOption()
                        .replace("#url#", url)
                        .replace("#path#", ObjectUtility.formatToCamelCase(set.getKey()))
                        .replace("#label#", temp)
                        .replace("#id#", ObjectUtility.formatToCamelCase(id))
                        .replace("#attribute#", ObjectUtility.formatToCamelCase(attribute));
                    option = Misc.tabulate(Misc.tabulate(option));
                    res += this.getViewProperties().getSelect()
                    .replace("#name#", ObjectUtility.formatToCamelCase(set.getKey()))
                    .replace("#option#", option);
                    continue;
                }
                res += template
                .replace("#label#", ObjectUtility.formatToSpacedString(set.getKey()))
                .replace("#type#", this.getViewProperties().getListMapping().get(set.getValue().split("\\.")[set.getValue().split("\\.").length -1]))
                .replace("#name#", ObjectUtility.formatToCamelCase(set.getKey())) + "\n";        
            }
        }
        return Misc.tabulate(res);
    }

    public String getOptionUpdate(HashMap<String, String> foreignKeys, String url, String id, String attribute) throws Exception{
        String res = "";
        if (foreignKeys.isEmpty()) {
            return "";
        }
        for (Map.Entry<String, String> set : foreignKeys.entrySet()) {
            res += this.getViewProperties().getOptionUpdate()
                .replace("#url#", url)
                .replace("#path#", ObjectUtility.formatToCamelCase(set.getKey()))
                .replace("#Name#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getValue())))
                .replace("#label#", ObjectUtility.formatToCamelCase(set.getValue()))
                .replace("#id#", ObjectUtility.formatToCamelCase(id))                
                .replace("#attribute#", ObjectUtility.formatToCamelCase(attribute))
                ;
            res += "\n";
        }
        return Misc.tabulate(res);
    }

    public String getInputUpdate(HashMap<String, String> columns, HashMap<String, String> foreignKeys, List<String> primaryKeys, String url, String id) throws Exception{
        String res ="";
        String template = this.getViewProperties().getInputUpdate();
        for (Map.Entry<String, String> set : columns.entrySet()) {
            if (!primaryKeys.contains(set.getKey())) {
                String temp = foreignKeys.get(set.getKey());
                if(temp != null){
                    res += this.getViewProperties().getSelectUpdate()
                    .replace("#name#", ObjectUtility.formatToCamelCase(temp))
                    .replace("#id#", ObjectUtility.formatToCamelCase(id))
                    .replace("#Name#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(temp)));
                    continue;
                }
                res +=  template
                .replace("#label#", ObjectUtility.formatToSpacedString(set.getKey()))
                .replace("#type#", this.getViewProperties().getListMapping().get(set.getValue().split("\\.")[set.getValue().split("\\.").length -1]))
                .replace("#Name#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getKey())))
                .replace("#name#", ObjectUtility.formatToCamelCase(set.getKey())) + "\n";        
            }else{
                res += template
                .replace("#label#", "")
                .replace("#type#", "hidden")                
                .replace("#Name#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getKey())))
                .replace("#name#", ObjectUtility.formatToCamelCase(set.getKey())) + "\n";          
            }
        }
        return Misc.tabulate(res);
    }

    public String getHeaders(HashMap<String, String> columns){
        String res ="";
        String template = this.getViewProperties().getTableHeader();
        for (Map.Entry<String, String> set : columns.entrySet()) {
            res += "\t\t" + template
            .replace("#label#", ObjectUtility.formatToSpacedString(set.getKey())) + "\n";
        }
        return res;
    }

    public String getTableValue(HashMap<String, String> columns, HashMap<String, String> foreignKeys, String attribute){
        String res ="";
        String template = this.getViewProperties().getTableValue();
        for (Map.Entry<String, String> set : columns.entrySet()) {
            if(foreignKeys.get(set.getKey()) != null){
                res += "\t\t" + template
                // .replace("#values#", ObjectUtility.formatToCamelCase(foreignKeys.get(set.getKey())) + "." + ObjectUtility.formatToCamelCase(attribute)) + "\n";                
                .replace("#values#", ObjectUtility.formatToCamelCase(set.getKey()) + "." + ObjectUtility.formatToCamelCase(attribute)) + "\n";                
            }else{
                res += "\t\t" + template
                .replace("#values#", ObjectUtility.formatToCamelCase(set.getKey())) + "\n";
            }
        }
        return res;
    }

    public String getHandleInputSelectChange(HashMap<String, String> columns, HashMap<String, String> foreignKeys, List<String> primaryKeys){
        String res = "";
        String template = this.getViewProperties().getHandleInputChange();
        for (Map.Entry<String, String> set : columns.entrySet()) {
            String temp = foreignKeys.get(set.getKey());
            if(temp != null){
                res += this.getViewProperties().getHandleSelectChange()
                .replace("#Name#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getKey())))
                .replace("#name#", ObjectUtility.formatToCamelCase(set.getKey())) + "\n";
                continue;
            }
            res +=  template                    
            .replace("#Name#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getKey())))
            .replace("#name#", ObjectUtility.formatToCamelCase(set.getKey())) + "\n"; 
        }       
        return Misc.tabulate(res);
    }

    public String getValues(HashMap<String, String> columns, HashMap<String, String> foreignKeys, String table){
        String res = "";
        String template = this.getViewProperties().getValues();
        res += template
            .replace("#entity#", ObjectUtility.formatToCamelCase(table))
            .replace("#Entity#", ObjectUtility.capitalize(table)) + "\n";
        for (Map.Entry<String, String> set : columns.entrySet()) {
            String temp = foreignKeys.get(set.getKey());
            if(temp != null){
                res += this.getViewProperties().getValues()
                .replace("#entity#", ObjectUtility.formatToCamelCase(set.getKey()))
                .replace("#Entity#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getKey()))) + "\n";
                continue;
            }
        }
        return Misc.tabulate(res);
    }

    public String getFetcher(HashMap<String, String> columns, HashMap<String, String> foreignKeys, String table){
        String res = "";
        String template = this.getViewProperties().getFetch();
        String counts = "\n const c = response.headers.get('X-Total-Count'); \n \t\t\t setCount(c);";
        res += template
            .replace("#entity#", ObjectUtility.formatToCamelCase(table))
            .replace("#counts#", counts)
            .replace("#count#", "+currentPage")
            .replace("#dependencies#" , "currentPage")
            .replace("#Entity#", ObjectUtility.capitalize(table));
            
        for (Map.Entry<String, String> set : columns.entrySet()) {
            String temp = foreignKeys.get(set.getKey());
            if(temp != null){
                res += this.getViewProperties().getFetch()
                // .replace("#entity#", ObjectUtility.formatToCamelCase(set.getKey()))
                .replace("#entity#", ObjectUtility.formatToCamelCase(temp))
                .replace("#counts#","")
                .replace("#count#", "")
            .replace("#dependencies#" , "")
                .replace("#Entity#", ObjectUtility.capitalize(ObjectUtility.formatToCamelCase(set.getKey())));
                continue;
            }
        }
        return Misc.tabulate(res);
    }

    public HashMap<String, String> getIdAndAttribute(DbConnection dbConnection, HashMap<String, String> foreignKeys) throws Exception{
        String attribute = "";
        String id = "";
        HashMap<String,String> map = new HashMap<>();
        for (Map.Entry<String, String> set : foreignKeys.entrySet()) {
            List<String> tempPrimaryKey = DbService.getPrimaryKey(dbConnection, set.getValue());
            id = tempPrimaryKey.get(0);
            HashMap<String, String> tempColumns = DbService.getDetailsColumn(dbConnection.getConnection(), set.getValue());
            for (Map.Entry<String, String> set2 : tempColumns.entrySet()) {
                if(set2.getValue().equals("java.lang.String")){
                    attribute = set2.getKey();
                    break;
                }
            }
            break;
        }
        map.put("attribute", attribute);
        map.put("id", id);
        return map;
    }

    public String getImports(String[] tables){
        String res = "";
        for (String table : tables) {
            String temp = ObjectUtility.formatToCamelCase(table);
            res += this.getViewProperties().getRouteImportSyntax()
                    .replaceAll("#path#", temp)
                    .replace("#element#", ObjectUtility.capitalize(temp))
                     + "\n";
        }
        return res;
    }

    public String generateView(String table, String url, DbConnection dbConnection, String framework) throws Exception{
        String res = "";        
        String tempPath = Misc.getViewTemplateLocation().concat(File.separator).concat(this.getViewProperties().getTemplate());
        String template = FileUtility.readOneFile(tempPath);
        List<String> primaryKeys = DbService.getPrimaryKey(dbConnection, table);
        // String path = framework.toLowerCase().contains("dotnet") ? "[" + ObjectUtility.formatToCamelCase(table) + "]" : ObjectUtility.formatToCamelCase(table);
        String path = ObjectUtility.formatToCamelCase(table);
        HashMap<String, String> columns = DbService.getDetailsColumn(dbConnection.getConnection(), table);
        HashMap<String, String> foreignKeys = DbService.getForeignKeys(dbConnection, table);
        HashMap<String, String> idAndAttribute = this.getIdAndAttribute(dbConnection, foreignKeys);
        String id = idAndAttribute.get("id");
        String attribute = idAndAttribute.get("attribute");
        System.out.println("Path is ==> " + path);
        res = template.replace("#header#", getHeaders( columns))
        .replace("#inputInsert#", getInputInsert(columns, foreignKeys, primaryKeys, url, id, attribute))
        .replace("#inputUpdate#", getInputUpdate(columns, foreignKeys, primaryKeys, url, id))
        .replace("#optionUpdate#", getOptionUpdate(foreignKeys, url, id, attribute))
        .replace("#handleInputSelectChange#", getHandleInputSelectChange(columns, foreignKeys, primaryKeys))
        .replace("#getValues#", getFetcher(columns, foreignKeys, table))
        .replace("#values#", getValues(columns, foreignKeys, table))
        .replace("#entity#", ObjectUtility.formatToCamelCase(table))
        .replace("#tableValue#", getTableValue(columns, foreignKeys, attribute))
        .replace("#url#", url)
        .replace("#id#", ObjectUtility.formatToCamelCase(primaryKeys.get(0)))
        .replace("#path#", path)
        .replace("#label#", ObjectUtility.formatToCamelCase(primaryKeys.get(0)));

        return res;
    }

    public String getRoutes(String[] tables){
        String res = "";
        for (String table : tables) {
            String temp = ObjectUtility.formatToCamelCase(table);
            res += this.getViewProperties().getRouteSyntax()
                    .replaceAll("#path#", temp)
                    .replace("#element#", ObjectUtility.capitalize(temp))
                     + "\n";
        }
        return (Misc.tabulate(res));
    }

    String getTabs( String[] tables ){
        String res = "";
        for (String table : tables) {
            String temp = ObjectUtility.formatToCamelCase(table);
            res += this.getViewProperties().getIonicTabSyntax()
                    .replaceAll("#path#", temp)
                    .replace("#element#", ObjectUtility.capitalize(temp))
                     + "\n";
        }
        return (Misc.tabulate(res));
    }

    public String generateRoutes(String[] tables) throws Exception{
        String res = "";
        if(this.getViewProperties().getRouteTemplate().equals(""))
            return res;
        String tempPath = Misc.getViewTemplateLocation().concat(File.separator).concat(this.getViewProperties().getRouteTemplate());
        res = FileUtility.readOneFile(tempPath);
        res = res.replace("${IMPORTS}", this.getImports(tables))
                .replace("${ROUTES}", this.getRoutes(tables))
                .replace("${TABS}", this.getTabs(tables));
        return res;
    }


}
