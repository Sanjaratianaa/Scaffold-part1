package ambovombe.kombarika.configuration.main;

import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ambovombe.kombarika.configuration.Configuration;
import ambovombe.kombarika.configuration.mapping.AuthProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AuthProperties extends Configuration {

    HashMap<String, AuthProperty> languages;

    @Override
    public void init() throws Exception {
        setJsonPath("authProperties.json");
        AuthProperties props = this.read();
        this.setLanguages(props.getLanguages());
    }

    public void display(){
        GsonBuilder builder = new GsonBuilder().setPrettyPrinting();
        System.out.println(builder.create().toJson(this));
    }

}
