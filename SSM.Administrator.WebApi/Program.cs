using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSM.Administrator.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        //https://github.com/loresoft/EntityFrameworkCore.Generator
        //dotnet tool install --global EntityFrameworkCore.Generator
        //efg generate -c 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=SSM_DB;Integrated Security=True' -p 'SqlServer'
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
