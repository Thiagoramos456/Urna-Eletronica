using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Models;
using UrnaBackend.Services.Interfaces;
using UrnaEFCore;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly UrnaContext _dbContext;
        private readonly IMapper _mapper;

        public CandidateService(UrnaContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<CandidateModel>> GetCandidates()
        {
            var candidates = await _dbContext.Candidates.ToListAsync();
            var mappedCandidates = candidates.Select(candidate => _mapper.Map<CandidateModel>(candidate));
            return mappedCandidates.ToList();
        }
    }
}
