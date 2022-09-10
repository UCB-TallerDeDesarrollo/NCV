using Microsoft.EntityFrameworkCore;
using NinosConValorAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(Program));
//entity framework config
var connectionString = builder.Configuration.GetConnectionString("NinosConValorDB");
builder.Services.AddDbContext<NCV_DBContext>(x => x.UseNpgsql(connectionString));


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
