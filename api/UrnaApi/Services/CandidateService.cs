using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Dtos;
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

        public async Task AddCandidate(CandidateRegisterDto candidate)
        {
            var mappedCandidate = _mapper.Map<Candidate>(candidate);
            _dbContext.Candidates.Add(mappedCandidate);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<CandidateRegisterDto>> GetCandidates()
        {
            var candidates = await _dbContext.Candidates.ToListAsync();
            var mappedModelCandidates = candidates.Select(candidate => _mapper.Map<CandidateRegisterDto>(candidate));
            return mappedModelCandidates.ToList();
        }
    }
}
