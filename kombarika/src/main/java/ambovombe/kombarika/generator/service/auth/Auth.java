package ambovombe.kombarika.generator.service.auth;

import java.io.File;

import ambovombe.kombarika.configuration.main.AuthProperties;
import ambovombe.kombarika.configuration.main.LanguageDetails;
import ambovombe.kombarika.configuration.mapping.AuthProperty;
import ambovombe.kombarika.configuration.mapping.LanguageProperties;
import ambovombe.kombarika.configuration.mapping.ViewProperties;
import ambovombe.kombarika.generator.parser.FileUtility;
import ambovombe.kombarika.generator.service.GeneratorService;
import ambovombe.kombarika.utils.Misc;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Auth {
    
    LanguageDetails details;
    LanguageProperties properties;
    AuthProperty authProperties;
    ViewProperties viewProperties;

    String generateAuthController(
        String packageName,
        String secretKey,
        String url
    ) throws Exception{
        String location = Misc.getAuthTemplateFolder().concat(File.separator).concat(this.getAuthProperties().getControllerTemplate());
        String template = FileUtility.readOneFile(location);
        template = template.replace("#package#", GeneratorService.getPackage(properties, packageName));
        template = template.replace("#secret-key#", secretKey);
        template = template.replace("#server-url#", url);
        return template;
    }
    
    String generateLoginModel(
        String packageName
        ) throws Exception{
            String location = Misc.getAuthTemplateFolder().concat(File.separator).concat(this.getAuthProperties().getLoginModel());
            String template = FileUtility.readOneFile(location);
            template = template.replace("#package#", GeneratorService.getPackage(properties, packageName));
        return template;
    }
    
    String generateAuthResponse(
        String packageName
        ) throws Exception{
            String location = Misc.getAuthTemplateFolder().concat(File.separator).concat(this.getAuthProperties().getResponseTemplate()  );
            String template = FileUtility.readOneFile(location);
            template = template.replace("#package#", GeneratorService.getPackage(properties, packageName));
            
        return template;
    }

    String generateLoginPage( String url ) throws Exception{
        String location = Misc.getAuthTemplateFolder().concat(File.separator).concat(this.getAuthProperties().getLoginAuth()  );
        String template = FileUtility.readOneFile(location);
        template = template.replace("#url#", url);
        return template;
    }

    String generateLoginDesign() throws Exception{
        String location = Misc.getAuthTemplateFolder().concat(File.separator).concat(this.getAuthProperties().getLoginDesign() );
        String template = FileUtility.readOneFile(location);
        return template;
    }

    public void generateAuth(
        String path,
        String authPackage,
        String url,
        String secretKey,
        String viewPath
    ) throws Exception{
        String controller = this.generateAuthController(authPackage, secretKey, url);
        String model = this.generateLoginModel(authPackage);
        String response = this.generateAuthResponse(authPackage);
        String authPage = this.generateLoginPage(url);
        String authDesign = this.generateLoginDesign();

        String directory = authPackage.replace(".", File.separator);
        String viewDirectory = path + File.separator + viewPath;
        
        FileUtility.createDirectory(directory,path);
        path = path + File.separator + directory;
        FileUtility.generateFile(path, GeneratorService.getFileName("AuthController", this.getProperties().getExtension()), controller);
        FileUtility.generateFile(path, GeneratorService.getFileName("LoginModel", this.getProperties().getExtension()), model);
        FileUtility.generateFile(path, GeneratorService.getFileName("AuthResponse", this.getProperties().getExtension()), response);
        FileUtility.generateFile(viewDirectory, GeneratorService.getFileName("Login", this.getViewProperties().getExtension()), authPage);
        FileUtility.generateFile(viewDirectory, GeneratorService.getFileName("Login", "css"), authDesign);
    }



}
