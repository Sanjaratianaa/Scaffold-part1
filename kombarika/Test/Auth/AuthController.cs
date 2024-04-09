namespace Test.Auth;


using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[Route("api/[[login]]")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost]
    public IActionResult Login([FromBody] LoginModel user)
    {
        if (user is null)
        {
            return BadRequest("Invalid client request");
        }

        if (user.UserName == "cssingh" && user.Password == "css@123")
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("FrameworkMrNainaAnayRehetraMiaraka"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5106/api",
                audience: "http://localhost:5106/api",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok(new AuthenticatedResponse { Token = tokenString });
        }

        return Unauthorized();
    }
}
