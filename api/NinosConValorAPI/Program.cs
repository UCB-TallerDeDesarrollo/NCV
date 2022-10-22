using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NinosConValorAPI.Data;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models.Security;
using NinosConValorAPI.Services;
using NinosConValorAPI.Services.Security;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IFixedAssetService, FixedAssetService>();
builder.Services.AddTransient<IKidService, KidService>();
builder.Services.AddTransient<IHealthReportService, HealthReportService>();
builder.Services.AddTransient<IBiometricsService, BiometricsService>();
builder.Services.AddTransient<IProgramHouseService, ProgramHouseService>();
builder.Services.AddTransient<IAssetCategoryService, AssetCategoryService>();
builder.Services.AddTransient<INCVRepository, NCVRepository>();


//entity framework config
var connectionString = builder.Configuration.GetConnectionString("NinosConValorDB");
builder.Services.AddDbContext<NCV_DBContext>(x => x.UseNpgsql(connectionString));

//Security Configuration
builder.Services.AddScoped<IUserService, UserService>();

///Identity config
builder.Services.AddIdentity<IdentityAppUser, IdentityRole>(options => {
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8;
}).AddEntityFrameworkStores<NCV_DBContext>()
.AddDefaultTokenProviders();

///JWT config
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["AuthSettings:Audience"],
        ValidIssuer = builder.Configuration["AuthSettings:Issuer"],
        RequireExpirationTime = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AuthSettings:Key"])),
        ValidateIssuerSigningKey = true
    };
});

//CORS configuration
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => {
        options.AllowAnyOrigin(); 
        options.AllowAnyMethod(); 
        options.AllowAnyHeader(); 
        //options.WithOrigins("https://ncv-application.web.app/", "http://localhost:5009/").AllowAnyHeader().AllowAnyMethod();

    });
});

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); //dates in postgresql

var app = builder.Build();

// Configure the HTTP request pipeline.

//CORS 
app.UseCors(options => { options.AllowAnyOrigin(); options.AllowAnyMethod(); options.AllowAnyHeader(); });


app.UseAuthorization();

app.MapControllers();

app.Run();

