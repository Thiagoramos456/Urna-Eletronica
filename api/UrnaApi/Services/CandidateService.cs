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

        public async Task DeleteCandidate(int candidateId)
        {
            var candidate = _dbContext.Candidates.FirstOrDefault((c => c.Id == candidateId));

            if (candidate != null)
            {
                _dbContext.Candidates.Remove(candidate);
            }

            await _dbContext.SaveChangesAsync();
        }

        public CandidateUrnDto GetCandidateByElectoralNumber(int electoralNumber)
        {
            var candidate = _dbContext.Candidates.FirstOrDefault((c => c.ElectoralNumber == electoralNumber));
            var mappedCandidate = _mapper.Map<CandidateUrnDto>(candidate);
            return mappedCandidate;
        }
    }
}
