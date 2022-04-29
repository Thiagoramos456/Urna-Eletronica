using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Models;
using UrnaBackend.Services;
using UrnaBackend.Services.Interfaces;
using UrnaEFCore;
using UrnaEFCore.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UrnaContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("UrnaContext"), b => b.MigrationsAssembly("UrnaBackend")));
builder.Services.AddTransient<ICandidateService, CandidateService>();

var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<Candidate, CandidateDto>().ReverseMap());

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<UrnaContext>();
    context.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
